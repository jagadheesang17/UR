import { test } from '../../customFixtures/expertusFixture'
import { FakerData } from '../../utils/fakerUtils';
import { readDataFromCSV } from '../../utils/csvUtil';
import { updateJiraIssue } from '../../jira/jira-integration';
import { logADefectInJira } from '../../jira/log-a-defect';
import { generateCode } from '../../data/apiData/formData';
import { credentials } from '../../constants/credentialData';

let createdCode: any
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
let CEUVALUE: string;
let CEUPROVIDER: string;
let jiraIssueKey: string | undefined; // Declare jiraIssueKey at the top level

test.describe(`TC110 Add Preferernce`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`TC060_TP_Prerequisite_Course1_Elearning`, async ({ adminHome, createCourse ,contentHome,enrollHome}) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `TP Prerequisite Course1 Elearning` },
            { type: `Test Description`, description: `Verify that course should be created successfully` }

        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.enterCode("CRS-" + generateCode());
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName)
        createdCode = await createCourse.retriveCode()
        console.log("Extracted Code is : " + createdCode);
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectBycourse(courseName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage()

    })

    test(`Verify from learner site`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `TC052_Learner Side Course Enrollment` },
            { type: `Test Description`, description: `Verify that course should be created for Single instance` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
    })
    test(`TC110_Adding Preference Details`, async ({ learnerHome, profile, createUser }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Adding Preference Details` },
            { type: `Test Description`, description: `Verify that learner can add the preference details successfully` }
        );
        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);
        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;
            {
                await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
                await profile.clickProfile();
                await profile.preferenceTab();
                // await profile.ceuType();
                await profile.creditPeriod("March")
                await profile.preferenceTimeZone("GMT");
                await profile.creditScore()
                await profile.selectDateFormat();
                await profile.selectLanguage()
                await profile.selectCurrency()

                // await profile.selectDetailsPage()
                // await profile.selectCountry()
                // await profile.city()
                // await profile.address1()
                // await profile.address2()
                // await profile.zipcode()
                // await profile.mobile()
                // await profile.phone()
                // await profile.selectDepartment()
                // await profile.employeeId()
                // await profile.selectEmployeeType();
                // await profile.selectJobRole();
                // await profile.selectJobTitle();
                // await profile.selectOrganization()
                // await profile.selectUserType()
                await profile.clickSave()
                await profile.verifySavedChanges()

            }
        }

    })

})
// test.afterEach(async ({}, testInfo) => {
//     jiraIssueKey = await logADefectInJira(testInfo);

// });
//  test.afterAll(async ({},testInfo) => {
//         if (jiraIssueKey) {
//         // Replace with the actual folder path
//             await updateJiraIssue(jiraIssueKey, 'C:/New folder(2)/ExpertusOne/test-results/**/test-*.png');
//         }
//     });

