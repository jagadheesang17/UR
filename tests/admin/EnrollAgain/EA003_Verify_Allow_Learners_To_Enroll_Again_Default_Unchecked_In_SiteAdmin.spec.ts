import { test } from "../../../customFixtures/expertusFixture";
import { credentials } from "../../../constants/credentialData";
import { FakerData } from "../../../utils/fakerUtils";

let createdCode: string;
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
const courseCode = `EA003-${`${Date.now()}`.slice(-5)}`;
test.describe(`TC101 Course creation for E-learning single registration`, async () => {
    test.describe.configure({ mode: 'serial' })
    
    test(`Verify_Allow_Learners_To_Enroll_Again_Default_Unchecked_In_SiteAdmin`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify Allow learners to enroll again (default) is unchecked in Site Admin` },
            { type: `Test Description`, description: `Verify that 'Allow learners to enroll again (default)' checkbox is unchecked in Site Admin Business Rules` }
        );
        
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.clickBusinessRulesEditIcon();
        await siteAdmin.verifyAllowLearnersEnrollAgainDefault(true);
        await siteAdmin.uncheckAllowLearnersEnrollAgainDefault();
    });

    test(`TC101_CreateCourseForElearning_Single_Registration`, async ({ adminHome, createCourse, editCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create the course as Single Registration` },
            { type: `Test Description`, description: `Verify that course should be created for Single Registration` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.entercode(courseCode);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
        await editCourse.clickBusinessRule();
        await editCourse.verifyAllowLearnersEnrollAgain(true);
        await createCourse.typeDescription("Added Business Rule " + courseName)
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
    })


    test(`Verification from learner site`, async ({ learnerHome, learnerCourse, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Learner Side - Enroll Again Verification` },
            { type: `Test Description`, description: `Verify that learner cannot enroll again when the checkbox is unchecked - Request Class should be visible` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        // await catalog.verifyEnrolledCourseByCODE(createdCode);
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await learnerCourse.verifyEnrollAgainNotVisible();
        await learnerCourse.verifyRequestClass();
    })
})


