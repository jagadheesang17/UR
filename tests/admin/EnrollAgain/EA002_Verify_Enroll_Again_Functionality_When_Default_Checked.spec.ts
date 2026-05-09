import { test } from "../../../customFixtures/expertusFixture";
import { credentials } from "../../../constants/credentialData";
import { FakerData } from "../../../utils/fakerUtils";

let createdCode: string;
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
const courseCode = `EA002-${`${Date.now()}`.slice(-5)}`;

test.describe(`EA002 Verify Enroll Again Functionality When Default Checked`, async () => {
    test.describe.configure({ mode: 'serial' });
    
    test(`EA002_Verify_Allow_Learners_To_Enroll_Again_Default_Checked_In_SiteAdmin`, async ({ adminHome, siteAdmin, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify Allow learners to enroll again (default) is checked in Site Admin` },
            { type: `Test Description`, description: `Verify that 'Allow learners to enroll again (default)' checkbox is checked in Site Admin Business Rules` }
        );
        
        // Step 1: Login as Customer Admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        
        // Step 2: Navigate to Site Admin -> Admin Configuration -> Business Rules
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.clickBusinessRulesEditIcon();
        
        // Step 3: If unchecked, check it; if already checked, skip
        await siteAdmin.checkAllowLearnersEnrollAgainDefault();
        
        // Step 4: Verify 'Allow learners to enroll again (default)' checkbox is checked
        await siteAdmin.verifyAllowLearnersEnrollAgainDefault(false);
    });

    test(`EA002_Create_Course_And_Verify_Allow_Learners_To_Enroll_Again_Checkbox_Checked`, async ({ adminHome, createCourse, editCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create Course and Verify Allow learners to enroll again checkbox is checked` },
            { type: `Test Description`, description: `Verify that when 'Allow learners to enroll again (default)' is checked in Site Admin, the course-level checkbox is also checked` }
        );
        
        // Step 1: Login as Customer Admin (if not already logged in)
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        
        // Step 2: Navigate to Learning -> Course
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        
        // Step 3: Create a new course
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.entercode(courseCode);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name: " + description);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        
        // Step 4: Navigate to Business Rule tab
        await createCourse.clickEditCourseTabs();
        await editCourse.clickBusinessRule();
        
        // Step 5: Verify 'Allow learners to enroll again' checkbox is checked (inherited from Site Admin)
        await editCourse.verifyAllowLearnersEnrollAgain(false);
        await createCourse.typeDescription("This is a new course by name: " + description);
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();

        
        // await contentHome.gotoListing();
        // await createCourse.catalogSearch(courseName)
        // createdCode = await createCourse.retriveCode()
        // console.log("Extracted Code is : " + createdCode);
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectBycourse(courseName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage()
    });

    test(`EA002_Learner_Side_Verification_Enroll_Again`, async ({ learnerHome, learnerCourse, catalog,dashboard }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Learner Side - Enroll Again Verification` },
            { type: `Test Description`, description: `Verify that learner can enroll again in the same course after completion when 'Allow learners to enroll again' is enabled by default` }
        );
        
        // Step 1: Login as Learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        
        // Step 2: Open My Learning and select the admin-enrolled course
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        // await catalog.verifyEnrolledCourseByCODE(createdCode);
        await catalog.clickCourseInMyLearning(courseName);

        // Step 3: Launch and complete the course
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        
        // Step 4: Enroll again in the course
        await learnerCourse.clickReEnroll();
        //await catalog.clickSelectcourse(courseName);
        await catalog.clickEnroll();
        
        // Step 5: Verify and confirm enroll again popup
        await learnerCourse.reEnrollPopup();
        
        // Step 6: Launch and complete the course again
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        
        // Step 7: Verify the course appears in Completed section
        await catalog.clickMyLearning();
        await dashboard.selectDashboardItems("Learning History");
        await dashboard.learningHistoryCourseSearch(courseName);
    });
});
