import { test } from "../../../customFixtures/expertusFixture"
import { generateCode } from "../../../data/apiData/formData";
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

let createdCode: any
const code = "CRS"+"-"+generateCode()
let courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`Confirm that Scorm2004 content functions correctly and as expected`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Scorm2004 content`, async ({ adminHome, createCourse ,enrollHome,contentHome}) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Scorm2004 content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Scorm2004 content` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.entercode(code);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary('Passed-Failed-SCORM2004');
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


    test(`Confirm that Scorm2004 content functions correctly and as expected`, async ({ learnerHome, catalog, readContentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Confirm that Scorm2004 content functions correctly and as expected` },
            { type: `Test Description`, description: `Confirm that Scorm2004 content functions correctly and as expected` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);

        await readContentHome.readPassed_FailedScrom2004();
        await catalog.saveLearningStatus();
        await catalog.clickMyLearning();

        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);

    })

})

