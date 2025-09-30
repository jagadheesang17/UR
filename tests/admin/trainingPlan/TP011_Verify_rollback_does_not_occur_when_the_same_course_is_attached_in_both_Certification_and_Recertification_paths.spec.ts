import { URLConstants } from "../../../constants/urlConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { generateCode } from "../../../data/apiData/formData";
import { credentials } from "../../../constants/credentialData";

const courseName1 = FakerData.getCourseName();
const TPName = "Rollback" + " " + FakerData.getCourseName();
const description = FakerData.getDescription();
let contentName: any;
const pageUrl = URLConstants.adminURL;
//let contentName = "content testing-001";
//Learner completes the course as a standalone course and then registers for the same certification in recertification path.

test.describe(`Verify_rollback_does_not_occur_when_the_same_course_is_attached_in_both_Certification_and_Recertification_paths.spec.ts`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Youtube content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Youtube content` }
        );
        // await adminHome.clearBrowserCache(pageUrl)
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName1);
        await createCourse.entercode("CRS-" + generateCode());
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        contentName = await createCourse.getAttachedContentName()
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })


    test(`Certification Creation With same Single instance elearning attached in both path`, async ({ adminHome, learningPath, enrollHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Certification Creation With same Single instance elearning attached in both path` },
            { type: `Test Description`, description: `Certification Creation With same Single instance elearning attached in both path` }
        );
        //  let courseName1 = "Wireless Firewall Quantify";
        //  let courseName2 = "Digital Transmitter Calculate";
        //  await adminHome.clearBrowserCache(pageUrl)
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await createCourse.entercode("CRT-" + generateCode());
        await learningPath.title(TPName);
        await learningPath.description(description);
        await learningPath.language();
        await learningPath.hasRecertification();
        await learningPath.clickExpiresButton()
        await learningPath.clickSaveAsDraftBtn();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName1);
        await learningPath.clickAddSelectCourse();
        await learningPath.clickDetailTab();
        // await learningPath.addRecertificationCourse();
        await learningPath.clickAddCourse();
        await learningPath.addCourseManually();
        await learningPath.searchAndClickCourseCheckBox(courseName1);
        await learningPath.clickAddSelectCourse();
        await learningPath.saveRecertification(courseName1);
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();
        await learningPath.clickEditCertification();
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


    test(`Confirm_whether_a_rollback_does_not_occur_when_a_learner_enrolls_in_an_already_completed_course_as_part_of_the_certification`, async ({ learnerHome, catalog, dashboard }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `CER011_Confirm_whether_a_rollback_does_not_occur_when_a_learner_enrolls_in_an_already_completed_course_as_part_of_the_certification` },
            { type: `Test Description`, description: `CER011_Confirm_whether_a_rollback_does_not_occur_when_a_learner_enrolls_in_an_already_completed_course_as_part_of_the_certification` }

        );
         await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickDashboardLink();
        await dashboard.clickLearningPath_And_Certification();
        await dashboard.clickCertificationLink();
        await dashboard.searchCertification(TPName);
        await dashboard.verifyTheEnrolledCertification(TPName);
        await catalog.clickMoreonCourse(TPName);
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        // await catalog.clickViewCertificate();
        await catalog.verifyStatus("Completed");  //TP status   
        await catalog.verifyTPOverallProgressPercentage(); //TP overall percentage verification
        await catalog.verifytpCourseStatus(TPName, "Completed"); //TP particular course status
        await catalog.verifyContentProgressValue(contentName); //Content progress value verification    
        //  await dashboard.clickRecertifyIcon(TPName);
        await catalog.clickRecertifyButton();
        await catalog.verifyStatus("Enrolled");  //TP status
        await catalog.verifytpCourseStatus(TPName, "Enrolled"); //TP particular course status
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await catalog.verifyStatus("Completed");  //TP status
        await catalog.verifytpCourseStatus(TPName, "Completed"); //TP particular course status

    })



})