import { test as baseTest } from '@playwright/test'
import { AdminLogin } from '../pages/AdminLogin'
import { AdminHomePage } from '../pages/AdminHomePage'
import { LearnerLogin } from '../pages/LearnerLogin'
import { LearnerHomePage } from '../pages/LearnerHomePage'
import { CatalogPage } from '../pages/CatalogPage'
import { CoursePage } from '../pages/CoursePage'
import { UserPage } from '../pages/UserPage'
import { MetaLibraryPage } from '../pages/MetaLibraryPage'
import { EditCoursePage } from '../pages/EditCoursePage'
import { AdminGroupPage } from '../pages/AdminGroupPage'
import { OrganizationPage } from '../pages/OrganizationPage'
import { LocationPage } from '../pages/LocationPage'
import { CommerceHomePage } from '../pages/CommerceHomePage'
import { LearningPathPage } from '../pages/LearningPathPage'
import { CompletionCertificationPage } from '../pages/CompletionCertificationPage'
import { LearnerDashboardPage } from '../pages/LearnerDashboardPage'
import DB from '../utils/dbUtil'
import { BannerPage } from '../pages/BannerPage'
import { CostcenterPage } from '../pages/CostcenterPage'
import { AnnouncementPage } from '../pages/AnnouncementPage'
import { ContentHomePage } from '../pages/ContentPage'
import { LearnerCoursePage } from '../pages/LearnerCoursePage'
import { LearnerGroupPage } from '../pages/LearnerGroupPage'
import { SurveyAssessmentPage } from '../pages/SurveyAssessmentPage'
import { ProfilePage } from '../pages/ProfilePage'
import { EnrollmentPage } from '../pages/EnrollmentPage'
import { InstructorPage } from '../pages/InstructorPage'
import { ManagerPage } from '../pages/ManagerPage'
import { ReadContentPage } from '../pages/ReadContentPage'
import { AdminRolePage } from '../pages/AdminRole'
import { ExcelReader } from '../utils/excelUtils'
import { logADefectInJira } from '../jira/log-a-defect'
import { updateJiraIssue } from '../jira/jira-integration'
import { UniversalSearchPage } from '../pages/UniversalSearchPage'
import path from 'path'
import { glob } from 'glob'
import { SiteAdminPage } from '../pages/SiteAdminPage'
import * as XLSX from 'xlsx';
import * as fs from 'fs';

let jiraIssueKey: string | undefined;
// import { LearnerCoursePage } from '../pages/LearnerCoursePage'

type expertusFixture = {
    // adminLogin: AdminLogin
    adminHome: AdminHomePage
    createUser: UserPage
    createCourse: CoursePage
    editCourse: EditCoursePage
    learningPath: LearningPathPage
    CompletionCertification: CompletionCertificationPage
    location: LocationPage
    learnerLogin: LearnerLogin
    learnerHome: LearnerHomePage
    learnerCourse: LearnerCoursePage
    catalog: CatalogPage
    SurveyAssessment: SurveyAssessmentPage
    dashboard: LearnerDashboardPage
    organization: OrganizationPage
    metadatalibrary: MetaLibraryPage
    adminGroup: AdminGroupPage
    commercehome: CommerceHomePage
    bannerHome: BannerPage
    dataBase: DB
    costCenter: CostcenterPage
    announcementHome: AnnouncementPage
    contentHome: ContentHomePage
    profile: ProfilePage
    enrollHome: EnrollmentPage
    instructorHome: InstructorPage
    managerHome: ManagerPage
    readContentHome: ReadContentPage
    adminRoleHome: AdminRolePage
    excelReader: ExcelReader
    universalSearch: UniversalSearchPage
    learnerGroup: LearnerGroupPage
    siteAdmin: SiteAdminPage
}

import { Page } from '@playwright/test';

export const test = baseTest.extend<expertusFixture & { pageWithLogging: Page }>({
    pageWithLogging: async ({ page, context }, use, testInfo) => {
        const client = await context.newCDPSession(page);
        await client.send('Network.enable');

        type TimingEntry = {
            requestId: string;
            url: string;
            method: string;
            type?: string;
            status?: number;
            startTime?: number;
            duration?: number;
            postData?: string;
        };

        const timings: TimingEntry[] = [];
        const requests = new Map<string, TimingEntry>();

        client.on('Network.requestWillBeSent', async (event) => {
            const entry: TimingEntry = {
                requestId: event.requestId,
                url: event.request.url,
                method: event.request.method,
                type: event.type,
                startTime: Date.now(),
            };

            if (event.request.hasPostData) {
                try {
                    const data = await client.send('Network.getRequestPostData', {
                        requestId: event.requestId,
                    });
                    entry.postData = data.postData;
                } catch {
                    // some requests won’t expose body
                }
            }
            requests.set(event.requestId, entry);
        });

        client.on('Network.responseReceived', (event) => {
            const entry = requests.get(event.requestId);
            if (entry) {
                entry.status = event.response.status;
                requests.set(event.requestId, entry);
            }
        });

        client.on('Network.loadingFinished', (event) => {
            const entry = requests.get(event.requestId);
            if (entry && entry.startTime) {
                entry.duration = Date.now() - entry.startTime;
                timings.push(entry);
            }
        });

        await use(page);

        // Prepare slow/normal sets
        const slowOnes = timings.filter((t) => (t.duration ?? 0) > 2000);
        const logData = slowOnes.length > 0 ? slowOnes : timings;

        console.log(`\n=== Network timings for test: ${testInfo.title} ===`);
        console.table(
            logData.map(({ method, type, status, duration, url, postData }) => ({
                method,
                type,
                status,
                duration,
                url,
                body: postData
                    ? postData.slice(0, 120) + (postData.length > 120 ? '...' : '')
                    : undefined,
            }))
        );

        // 🔹 Save Excel
        // saveRequestsToExcel('network_timings_all.xlsx', timings, testInfo.title);
        // saveRequestsToExcel('network_timings_slow.xlsx', slowOnes, testInfo.title);
    },


    /*  adminLogin: async ({ pageWithLogging, context }, use) => {
         const adLogin = new AdminLogin(pageWithLogging, context);
         await adLogin.adminLogin()
         await use(adLogin);
         //console.log("Login is verified"        
     }, */

    adminHome: async ({ pageWithLogging, context }, use,) => {
        const adminHome = new AdminHomePage(pageWithLogging, context);
        await use(adminHome);
    },

    learnerLogin: async ({ pageWithLogging, context }, use) => {
        const lnLogin = new LearnerLogin(pageWithLogging, context);
        // await lnLogin.learnerLogin(credentialConstants.LEARNERUSERNAME, credentialConstants.PASSWORD);
        await use(lnLogin);
        console.log("Login is verified");

    },
    CompletionCertification: async ({ pageWithLogging, context }, use) => {
        const CompletionCertification = new CompletionCertificationPage(pageWithLogging, context);
        await use(CompletionCertification);
    },

    createUser: async ({ pageWithLogging, context }, use) => {
        const createUser = new UserPage(pageWithLogging, context);
        await use(createUser);
    },
    createCourse: async ({ pageWithLogging, context }, use) => {
        const createCourse = new CoursePage(pageWithLogging, context);
        await use(createCourse);
    },
    learningPath: async ({ pageWithLogging, context }, use) => {
        const learningPath = new LearningPathPage(pageWithLogging, context);
        await use(learningPath);
    },

    editCourse: async ({ pageWithLogging, context }, use) => {
        const editCourse = new EditCoursePage(pageWithLogging, context);
        await use(editCourse);
    },
    location: async ({ pageWithLogging, context }, use) => {
        const location = new LocationPage(pageWithLogging, context);
        await use(location);
    },
    learnerHome: async ({ pageWithLogging, context }, use) => {
        const learnerHome = new LearnerHomePage(pageWithLogging, context);
        await use(learnerHome);
    },
    learnerCourse: async ({ pageWithLogging, context }, use) => {
        const learnercourse = new LearnerCoursePage(pageWithLogging, context);
        await use(learnercourse);
    },
    SurveyAssessment: async ({ pageWithLogging, context }, use) => {
        const SurveyAssessment = new SurveyAssessmentPage(pageWithLogging, context);
        await use(SurveyAssessment);
    },
    catalog: async ({ pageWithLogging, context }, use) => {
        const catalog = new CatalogPage(pageWithLogging, context);
        await use(catalog);
    },
    dashboard: async ({ pageWithLogging, context }, use) => {
        const dashboard = new LearnerDashboardPage(pageWithLogging, context);
        await use(dashboard);
    },
    // learnercourse: async ({ pageWithLogging, context }, use) => {
    //     const learnerCourse = new LearnerCoursePage(pageWithLogging, context);
    //     await use(learnerCourse);
    // },
    metadatalibrary: async ({ pageWithLogging, context }, use) => {
        const metadatalibrary = new MetaLibraryPage(pageWithLogging, context);
        await use(metadatalibrary);
    },
    adminGroup: async ({ pageWithLogging, context }, use) => {
        const adminGroup = new AdminGroupPage(pageWithLogging, context);
        await use(adminGroup);
    },
    organization: async ({ pageWithLogging, context }, use) => {
        const organization = new OrganizationPage(pageWithLogging, context);
        await use(organization);
    },
    commercehome: async ({ pageWithLogging, context }, use) => {
        const commercehome = new CommerceHomePage(pageWithLogging, context);
        await use(commercehome);
    },

    bannerHome: async ({ pageWithLogging, context }, use) => {
        const bannerHome = new BannerPage(pageWithLogging, context);
        await use(bannerHome);
    },
    dataBase: async ({ }, use) => {
        const dataBase = new DB();
        await use(dataBase);
    },

    costCenter: async ({ pageWithLogging, context }, use) => {
        const costcenter = new CostcenterPage(pageWithLogging, context);
        await use(costcenter);
    },


    announcementHome: async ({ pageWithLogging, context }, use) => {
        const announcementHome = new AnnouncementPage(pageWithLogging, context);
        await use(announcementHome);
    },
    contentHome: async ({ pageWithLogging, context }, use) => {
        const ContentHome = new ContentHomePage(pageWithLogging, context);
        await use(ContentHome);
    },

    profile: async ({ pageWithLogging, context }, use) => {
        const profile = new ProfilePage(pageWithLogging, context);
        await use(profile);
    },
    enrollHome: async ({ pageWithLogging, context }, use) => {
        const enrollHome = new EnrollmentPage(pageWithLogging, context);
        await use(enrollHome);
    },
    instructorHome: async ({ pageWithLogging, context }, use) => {
        const instructorHome = new InstructorPage(pageWithLogging, context);
        await use(instructorHome);
    },
    managerHome: async ({ pageWithLogging, context }, use) => {
        const managerHome = new ManagerPage(pageWithLogging, context);
        await use(managerHome);
    },
    readContentHome: async ({ pageWithLogging, context }, use) => {
        const readContentHome = new ReadContentPage(pageWithLogging, context);
        await use(readContentHome);
    },

    adminRoleHome: async ({ pageWithLogging, context }, use) => {
        const adminRoleHome = new AdminRolePage(pageWithLogging, context);
        await use(adminRoleHome);
    },
    universalSearch: async ({ pageWithLogging, context }, use) => {
        const universalSearch = new UniversalSearchPage(pageWithLogging, context);
        await use(universalSearch);
    },
    learnerGroup: async ({ pageWithLogging, context }, use) => {
        const learnerGroup = new LearnerGroupPage(pageWithLogging, context);
        await use(learnerGroup);
    },
    siteAdmin: async ({ pageWithLogging, context }, use) => {
        const siteAdmin = new SiteAdminPage(pageWithLogging, context);
        await use(siteAdmin);
    },

})

/* test.afterEach(async ({}, testInfo) => {
    jiraIssueKey = await logADefectInJira(testInfo);
});

test.afterAll(async ({}) => {
   const filePath= process.cwd()
   const resultFile=await glob(filePath+"/test-results",{absolute:true})
   console.log(resultFile)
    if (jiraIssueKey && resultFile.length> 0) {
        await updateJiraIssue(jiraIssueKey,resultFile[0]); // Replace with the actual folder path
    }
}); */
// function saveRequestsToExcel(
//     filename: string,
//     requests: any[],
//     testName: string
// ) {
//     if (requests.length === 0) return;

//     let workbook: XLSX.WorkBook;
//     if (fs.existsSync(filename)) {
//         workbook = XLSX.readFile(filename);
//     } else {
//         workbook = XLSX.utils.book_new();
//     }

//     const sheetName = 'Requests';
//     let worksheet = workbook.Sheets[sheetName];

//     let existingData: any[] = [];
//     if (worksheet) {
//         existingData = XLSX.utils.sheet_to_json(worksheet);
//     }

//     const newRows = requests.map((t) => ({
//         test: testName,
//         method: t.method,
//         type: t.type,
//         status: t.status,
//         duration: t.duration,
//         url: t.url,
//         body: t.postData,
//     }));

//     const updatedData = [...existingData, ...newRows];
//     worksheet = XLSX.utils.json_to_sheet(updatedData);

//     if (!workbook.SheetNames.includes(sheetName)) {
//         XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
//     } else {
//         workbook.Sheets[sheetName] = worksheet;
//     }

//     XLSX.writeFile(workbook, filename);
// }