import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { generateCode } from "../../../data/apiData/formData";
import { credentials } from "../../../constants/credentialData";

const code = "CRS"+"-"+generateCode();
let courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
const contentName="Passed-Failed-SCORM2004";
let status="In Progress";
test.describe(`Confirm that Multiple Scorm1.2 content functions correctly and as expected`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Scorm1.2 content`, async ({ adminHome,enrollHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Multiple Scorm1.2 content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Multiple Scorm1.2 content` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.entercode("CRS"+"-"+generateCode());
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary("Completed-Incomplete-SCORM-1.2")
        await createCourse.clickContentLibrary();
        await createCourse.contentLibrary(contentName)
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
            await adminHome.menuButton()
                await adminHome.clickEnrollmentMenu();
                await adminHome.clickEnroll();
                await enrollHome.selectBycourse(courseName)
                await enrollHome.clickSelectedLearner();
                await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
                await enrollHome.clickEnrollBtn();
                await enrollHome.verifytoastMessage()
        
    })


    test(`Confirm that Multiple Scorm1.2 content functions correctly and as expected`, async ({ learnerHome, catalog, readContentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that Multiple Scorm1.2 content functions correctly and as expected` },
            { type: `Test Description`, description: `Confirm that Multiple Scorm1.2 content functions correctly and as expected` }
        );
     await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await readContentHome.Completed_Incomplete_SCORM12();
        await catalog.contentPlayByName(contentName);
        await catalog.verifyStatus(status)
        await readContentHome.readPassed_FailedScrom2004();
        await catalog.saveLearningStatus();
        await catalog.clickMyLearning();
        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);

    })

})
