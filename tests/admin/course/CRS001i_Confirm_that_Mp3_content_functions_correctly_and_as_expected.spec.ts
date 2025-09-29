import { test } from "../../../customFixtures/expertusFixture"
import { generateCode } from "../../../data/apiData/formData";
import { FakerData } from '../../../utils/fakerUtils';



const code = "CRS"+"-"+generateCode()
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`Confirm that Mp3 content functions correctly and as expected.`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Mp3 content`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Mp3 content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Mp3 content` }
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
        await createCourse.contentLibrary("AutoAudioFile"); //Need to upload the same content in all the environments
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })



    test(`Confirm that Mp3 content functions correctly and as expected.`, async ({ learnerHome, catalog,readContentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Confirm that Mp3 content functions correctly and as expected` },
            { type: `Test Description`, description: `Confirm that Mp3 content functions correctly and as expected` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(courseName);
        await catalog.clickEnroll();
        await catalog.playVimeo(); //playVimeo method is working here.
        await catalog.saveLearningStatus();
        await catalog.clickMyLearning();
        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);
    })

})
