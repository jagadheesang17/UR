import { defineConfig, devices } from '@playwright/test';


let jiraIssueKeys: string[] = [];
const timestamp = Date.now();
const reportDir = `./reporter/playwright-reports-${timestamp}`;

//If false qa will run,if its true automation environment will run
export let environmentSetup: "qa" | "dev" | "automation" | "qaProduction" = 'dev';
export default defineConfig({
  timeout: 800000,

  expect: {
    timeout: 100000
  },
  testDir: './tests',
  // globalSetup: require.resolve('utils/jiraReport.ts'),

  fullyParallel: false,
  retries: 0,
  workers: 2,
  repeatEach: 0,

  reporter: [['html', { outputFolder: reportDir, open: 'always' }], ['line'], ["allure-playwright"]],
  //reporter: [['html', { open: 'always' }]],
  use: {
    actionTimeout: 100000,
    trace: 'on',
    headless: false,
    screenshot: "on",
    video: 'on',
    ignoreHTTPSErrors: true,
    bypassCSP: true,

  },
  // testMatch removed to rely on Playwright default: **/?(*.)+(spec|test).[jt]s
  // (Previous custom list was empty/commented, preventing discovery and causing 'No tests found'.)

  projects: [
    /* {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chromium'],
        ignoreHTTPSErrors: true,
        headless: false,
        video: 'on',
        screenshot: "on",
        viewport: null,
        launchOptions: {
          slowMo: 300,
          args: ["--start-maximized"]
        },


      }

    }, */
    {
      name: 'chrome',
      use: {
        browserName: 'chromium', ...devices['Desktop Chromium'], channel: 'chrome', headless: false,
        viewport: null,
        launchOptions: {
          slowMo: 200,
          args: ["--start-maximized", "--disable-web-security", "--incognito"]
        }
      }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     ...devices['Desktop Firefox'],
    //     channel: 'firefox',
    //     headless: false,

    //     launchOptions: {
    //       slowMo: 400, 
    //       args: [
    //         '--start-maximized',
    //         '--private',
    //         '--disable-web-security',
    //       ],
    //     },
    //     viewport: { width: 1530, height: 740 },
    //   },
    // },
    ...(
      true ? [{
        name: 'Verification',
        testDir: './zCronVerification',
        use: {

          headless: false,
          ...devices['Desktop Chromium'],
          viewport: null,
          launchOptions: {
            slowMo: 300,
            args: ["--start-maximized"]
          }
        }
      },] : []
    ), ...(
      true ? [{
        name: 'API Testing',
        testDir: './api',

        use: {
          headless: false,
          ...devices['Desktop Chromium'],
          viewport: null,
          launchOptions: {
            slowMo: 300,
            args: ["--start-maximized"]
          }

        }
      },] : []
    ),
  ],



});
