import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { generateCode } from "../../../data/apiData/formData";
import { credentials } from "../../../constants/credentialData";

const courseName = FakerData.getCourseName();
const TPName = "Rollback" + " " + FakerData.getCourseName();
const description = FakerData.getDescription();
let contentName: any;

//Same course is attached to tp
//Learner completes the course as standalone then register for TP.

test.describe(`confirm_that_the_rollback_occurs_successfully_when_a_learner_completes_the_course_and_then_registers_for_the_certification.`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Youtube content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Youtube content` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.entercode("CRS-" + generateCode());
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
       // contentName = await createCourse.getAttachedContentName()
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectBycourse(courseName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage()

    })

    test(`Learner registration and completion of a single eLearning course.`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Learner registration and completion of a single eLearning course` },
            { type: `Test Description`, description: `Learner registration and completion of a single eLearning course` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "leanerURL");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await catalog.clickMyLearning();
        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);
    })

    test(`Creation of a certification with a single eLearning course attached`, async ({ adminHome, learningPath, createCourse,enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Creation of a certification with a single eLearning course attached` },
            { type: `Test Description`, description: `Creation of a certification with a single eLearning course attached` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await createCourse.entercode("CRT-" + generateCode());
        await learningPath.title(TPName);
        await learningPath.description(description);
        await learningPath.language();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName);
        await learningPath.clickAddSelectCourse();
        await learningPath.clickDetailTab();
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();
        await learningPath.clickEditCertification();
        // await learningPath.getCodeValue();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
        await learningPath.description(description);
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();

        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectByOption("Learning Path");
        await enrollHome.selectBycourse(TPName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage()


    })

    test(`confirm_that_the_rollback_occurs_successfully_when_a_learner_completes_the_course_and_then_registers_for_the_certification.`, async ({ learnerHome, catalog, dashboard }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `confirm_that_the_rollback_occurs_successfully_when_a_learner_completes_the_course_and_then_registers_for_the_certification.` },
            { type: `Test Description`, description: `confirm_that_the_rollback_occurs_successfully_when_a_learner_completes_the_course_and_then_registers_for_the_certification.` }

        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickDashboardLink();
        await dashboard.clickLearningPath_And_Certification();
        await dashboard.clickCertificationLink();
        await dashboard.searchCertification(TPName);
        await dashboard.verifyTheEnrolledCertification(TPName);
        await catalog.clickMoreonCourse(TPName)
        await catalog.verifyStatus("Completed");  //TP status   
        await catalog.verifyTPOverallProgressPercentage(); //TP overall percentage verification
        await catalog.verifytpCourseStatus(TPName, "Completed"); //TP particular course status
       // await catalog.verifyContentProgressValue(contentName); //Content progress value verification     
    })
})