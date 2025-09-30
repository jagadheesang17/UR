import { test } from "../../../customFixtures/expertusFixture"
import { generateCode } from "../../../data/apiData/formData";
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

let createdCode: any
const code = "CRS"+"-"+generateCode()
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`Confirm_that_PDF_content_functions_correctly_and_as_expected`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`CreateCourseFor Single Instance`, async ({ adminHome, createCourse ,enrollHome,contentHome}) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with PDF content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with PDF content` }
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
        await createCourse.contentLibrary("AutoPDF");
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


    test(`Confirm that PDF content functions correctly and as expected`, async ({ learnerHome, catalog, readContentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Confirm that PDF content functions correctly and as expected` },
            { type: `Test Description`, description: `Confirm that PDF content functions correctly and as expected` }
        );
      //  let courseName="Mobile Alarm Reboot";
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await readContentHome.readPDFContent();
        await catalog.saveLearningStatus();
        await catalog.clickMyLearning();
        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);
    })


})