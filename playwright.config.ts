import { defineConfig, devices } from "@playwright/test";

let jiraIssueKeys: string[] = [];
const timestamp = Date.now();
const reportDir = `./reporter/playwright-reports-${timestamp}`;

//If false qa will run,if its true automation environment will run
export let environmentSetup: "qa" | "dev" | "automation" | "qaProduction" = "dev";
export default defineConfig({
  timeout: 600000,

  expect: {
    timeout: 60000,
  },
  testDir: "./tests",
  // globalSetup: require.resolve('utils/jiraReport.ts'),

  fullyParallel: false,
  retries: 0,
  
  workers: 1,

  repeatEach: 0,

  reporter: [
    ["html", { outputFolder: reportDir, open: "always" }],
    ["line"],
    ["allure-playwright"],
  ],
  //reporter: [['html', { open: 'always' }]],
  use: {
    actionTimeout: 100000,
    trace: "on",
    headless: false,
    screenshot: "on",
    video: "on",
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    // Use maximized browser - let browser determine optimal viewport
    viewport: null,
    launchOptions: {
      args: [
        "--start-maximized",
        "--disable-web-security",
        "--force-device-scale-factor=1",
      ],
    },
  },

  // testMatch removed to rely on Playwright default: **/?(*.)+(spec|test).[jt]s
  // (Previous custom list was empty/commented, preventing discovery and causing 'No tests found'.)
    testMatch: [
    '*/tests/admin/adminGroups_addinguserstodefaultAdminGroups/**/*.spec.ts',
    '*/tests/admin/customrolecreation/**/*.spec.ts',
   // '*/tests/admin/metadataLibrary/**/*.spec.ts',
    '*/tests/admin/location/**/*.spec.ts',
    '*/tests/admin/admin_Enrollments/**/*.spec.ts',
    '*/tests/admin/completionCertificate/**/*.spec.ts',
    '*/tests/admin/assessment/**/*.spec.ts',
   // '*/tests/admin/banner/**/*.spec.ts',
    '*/tests/admin/survey/**/*.spec.ts',
    '*/tests/admin/content/**/*.spec.ts',
    '*/tests/admin/organization/**/*.spec.ts',
    '*/tests/admin/User_Creation/**/*.spec.ts',
    '*/tests/admin/verifyGroups/**/*.spec.ts',
    '*/tests/admin/directContentLaunch/**/*.spec.ts',
  // '*/tests/admin/commerce/**/*.spec.ts',
    '*/tests/admin/peoplemodule_user/**/*.spec.ts',
    '*/tests/admin/quickaccess/**/*.spec.ts',
    '*/tests/admin/announcement/**/*.spec.ts',
    '*/tests/admin/course/**/*.spec.ts',
    '*/tests/admin/trainingPlan/**/*.spec.ts',
   // '*/tests/admin/managerApproval/**/*.spec.ts',
   // '*/tests/Collaboration-Hub/**/*.spec.ts',
    '*/tests/LearnerSide/**/*.spec.ts',
    //'*/tests/Instructor/**/*.spec.ts',
    '*/tests/LearnerProfile/**/*.spec.ts',
    '*/tests/ReEnroll/**/*.spec.ts',
   // '*/tests/EnrollmentByManager/**/*.spec.ts',
    // '*/tests/Terms_and_Conditions/**/*.spec.ts',  
    // '*/tests/SSO/**/*.spec.ts',
    // '*/api/apiTestIntegration/**/*.spec.ts',

  ],
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
      name: "chrome",
      use: {
        browserName: "chromium",
        ...devices["Desktop Chromium"],
        channel: "chrome",
        headless: false,
        // Use maximized browser - let browser determine optimal viewport
        viewport: null,
        launchOptions: {
          slowMo: 300,
          // Maximize browser window for both headed and headless modes
          args: [
            "--start-maximized",
            "--disable-web-security",
            "--incognito",
            "--force-device-scale-factor=1",
          ],
        },
      },
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
    ...(true
      ? [
          {
            name: "Verification",
            testDir: "./zCronVerification",
            use: {
              headless: true,
              ...devices["Desktop Chromium"],
              viewport: null,
              launchOptions: {
                slowMo: 300,
                args: [
                  "--start-maximized",
                  "--disable-web-security",
                  "--force-device-scale-factor=1",
                ],
              },
            },
          },
        ]
      : []),
    ...(true
      ? [
          {
            name: "API Testing",
            testDir: "./api",

            use: {
              headless: true,
              ...devices["Desktop Chromium"],
              viewport: null,
              launchOptions: {
                slowMo: 300,
                args: [
                  "--start-maximized",
                  "--disable-web-security",
                  "--force-device-scale-factor=1",
                ],
              },
            },
          },
        ]
      : []),
  ],
});
