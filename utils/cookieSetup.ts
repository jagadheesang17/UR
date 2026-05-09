import { FakerData } from './fakerUtils'
import fs from 'fs'
import path from 'path'
import { chromium } from '@playwright/test'
import { URLConstants } from '../constants/urlConstants'
import { credentials } from '../constants/credentialData'

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

/** Path where captured portal IDs are stored (from GraphQL getSignupMetadata response) */
export const COURSE_CREATION_PORTALS_FILE = path.join(process.cwd(), 'data', 'courseCreationPortals.json');

/**
 * Generate cookies with retry mechanism
 * Retries up to 3 times if cookie generation fails
 */
export const setupCourseCreation = async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        let browser = null;
        let context = null;
        
        try {
            console.log(`🔑 Starting cookie setup... (Attempt ${attempt}/${MAX_RETRIES})`);
            
            browser = await chromium.launch({ 
                headless: false,
                args: ['--start-maximized']
            });
            context = await browser.newContext({ viewport: null });
            const page = await context.newPage();

            // Log when browser sends getSignupMetadata request (POST .../learner/.../graphql)
            page.on('request', (request) => {
                const url = request.url();
                const postData = request.postData() ?? '';
                if (url.includes('graphql') && url.includes('learner') && postData.includes('getsignupMetadata')) {
                    console.log(`[Cookie setup] Portal request SENT: ${url}`);
                }
            });
            // Capture learner GraphQL getSignupMetadata response → store portal _ids in file (backup if waitForResponse misses)
            page.on('response', async (response) => {
                const url = response.url();
                if (!url.includes('graphql') || !url.includes('learner')) return;
                if (!response.ok()) return;
                const postData = response.request().postData() ?? '';
                if (!postData.includes('getsignupMetadata')) return;
                try {
                    const bodyBytes = await response.body();
                    const body = JSON.parse(bodyBytes.toString());
                    const portals = body?.data?.portals;
                    if (!Array.isArray(portals) || portals.length === 0) return;
                    const ids = portals.map((p: { _id?: number }) => p._id).filter((id: unknown) => id != null);
                    if (ids.length === 0) return;
                    const portalIdsStr = ids.join(',');
                    const dataDir = path.join(process.cwd(), 'data');
                    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
                    fs.writeFileSync(COURSE_CREATION_PORTALS_FILE, JSON.stringify({
                        portalIds: portalIdsStr,
                        updatedAt: new Date().toISOString()
                    }, null, 2));
                    console.log(`[Cookie setup] Portal response CAPTURED (listener): ${portalIdsStr}`);
                } catch (e) {
                    const msg = (e as Error).message;
                    if (!msg.includes('No resource with given identifier')) {
                        console.warn(`[Cookie setup] Portal IDs not updated (existing portal unchanged):`, msg);
                    }
                }
            });
            
            const courseName = FakerData.getCourseName();
            
            // Use the URL and credentials from constants based on environment
            const baseUrl = URLConstants.adminURL;
            const { username, password } = credentials.CUSTOMERADMIN;

            // getSignupMetadata request runs when URL loads, before login — wait for it now
            console.log(`[Cookie setup] Waiting for getSignupMetadata response (after page load, before login, 20s)...`);
            const portalResponsePromise = page.waitForResponse(
                (resp) => {
                    const u = resp.url();
                    const post = resp.request().postData() ?? '';
                    return u.includes('graphql') && u.includes('learner') && post.includes('getsignupMetadata') && resp.ok();
                },
                { timeout: 20000 }
            );
            await page.goto(`${baseUrl.replace('/backdoor', '')}`, { timeout: 30000 });
            try {
                const portalResponse = await portalResponsePromise;
                console.log(`[Cookie setup] getSignupMetadata response CAPTURED: ${portalResponse.url()}`);
                const bodyBytes = await portalResponse.body();
                const body = JSON.parse(bodyBytes.toString());
                const portals = body?.data?.portals;
                if (Array.isArray(portals) && portals.length > 0) {
                    const ids = portals.map((p: { _id?: number }) => p._id).filter((id: unknown) => id != null);
                    if (ids.length > 0) {
                        const portalIdsStr = ids.join(',');
                        const dataDir = path.join(process.cwd(), 'data');
                        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
                        fs.writeFileSync(COURSE_CREATION_PORTALS_FILE, JSON.stringify({
                            portalIds: portalIdsStr,
                            updatedAt: new Date().toISOString()
                        }, null, 2));
                        console.log(`[Cookie setup] Portal IDs STORED: ${portalIdsStr}`);
                    }
                }
            } catch (e) {
                const msg = (e as Error).message;
                if (msg.includes('Timeout')) {
                    console.warn(`[Cookie setup] getSignupMetadata response NOT received within 20s after load (existing portal unchanged).`);
                } else {
                    console.warn(`[Cookie setup] Portal IDs not updated:`, msg);
                }
            }
            await page.click('#signin', { timeout: 10000 });
            await page.fill('#username', username);
            await page.fill('#password', password);
               await page.click("//button[contains(text(),'Sign In') or contains(text(),'SIGN IN') or contains(text(),'sign in') or contains(text(),'Sign in') or contains(text(),'Log In') or contains(text(),'LOG IN')]", { timeout: 20000 });
            
            // Navigate to course creation
            await page.click("//div[text()='Menu']", { timeout: 50000 });
            await page.click("//span[text()='Learning']", { timeout: 20000 });
            await page.click("//a[text()='Course']", { timeout: 20000 });
            await page.click("//button[text()='CREATE COURSE']", { timeout: 10000 });
            await page.waitForLoadState('networkidle', { timeout: 30000 });
            await page.waitForTimeout(1000);
            await page.click("(//span[text()='Click here'])[1]", { timeout: 10000 });
            
            const cookies = await context.cookies();
            
            // Validate cookies before saving
            if (!cookies || cookies.length === 0) {
                throw new Error('No cookies generated');
            }
            
            // Ensure data directory exists
            const dataDir = 'data';
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            
            // Save in BOTH formats to support different use cases:
            
            // 1. Text format (cookies.txt) - For API tests
            const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
            fs.writeFileSync('data/cookies.txt', cookieString);
            
            // 2. JSON format (cookies.json) - For UI Playwright tests (more reliable)
            fs.writeFileSync('data/cookies.json', JSON.stringify(cookies, null, 2));
            
            console.log(`✅ Saved ${cookies.length} cookies in both formats (Attempt ${attempt}/${MAX_RETRIES})`);
            
            await page.waitForTimeout(2000);
            await context.close();
            await browser.close();
            
            // Success - return
            return;
            
        } catch (error: any) {
            lastError = error;
            console.error(`❌ Cookie generation failed (Attempt ${attempt}/${MAX_RETRIES}):`, error.message);
            
            // Cleanup on error
            try {
                if (context) await context.close();
                if (browser) await browser.close();
            } catch (cleanupError) {
                console.error('Cleanup error:', cleanupError);
            }
            
            // If not the last attempt, wait before retrying
            if (attempt < MAX_RETRIES) {
                console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            }
        }
    }
    
    // All retries failed
    console.error(`❌ Cookie generation failed after ${MAX_RETRIES} attempts`);
    throw new Error(`Failed to generate cookies after ${MAX_RETRIES} attempts: ${lastError?.message}`);
}