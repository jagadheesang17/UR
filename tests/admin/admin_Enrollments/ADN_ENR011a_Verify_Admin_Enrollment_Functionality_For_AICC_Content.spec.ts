import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { generateCode } from "../../../data/apiData/formData";
import { FakerData } from '../../../utils/fakerUtils';

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let createdCode: any
test.describe(`Confirm that Admin enrollments functions correctly and as expected for AICC content`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Create course for Single Instance`, async ({ adminHome, createCourse,enrollHome,contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with AICC content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with AICC content` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.entercode("CRS-" + generateCode());
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary("AICC File containing a PPT - Storyline 11");
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


    test(`Confirm that AICC content functions correctly and as expected`, async ({ learnerHome, catalog, readContentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that AICC content functions correctly and as expected` },
            { type: `Test Description`, description: `Confirm that AICC content functions correctly and as expected` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
     //   await catalog.verifyEnrolledCourseByCODE(createdCode);
             await catalog.clickCourseInMyLearning(courseName);
        await readContentHome.AICCFilecontainingaPPT_Storyline();
        await readContentHome.saveLearningAICC();
        await catalog.clickMyLearning();
        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);
    })


})