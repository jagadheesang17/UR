import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { generateCode } from "../../../data/apiData/formData";
import { FakerData } from "../../../utils/fakerUtils";

let courseName = FakerData.getCourseName();
let description = FakerData.getDescription();
let domain: any
test.describe(`TC068_Certification_enroll_and_completion_with_single_instance.spec`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of E-learning single instance `, async ({ adminHome, createCourse }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Create the course as Single instance` },
            { type: `Test Description`, description: `Verify portal1 course is not availble to portal2 users` }

        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.getCourse();
        await createCourse.selectLanguage("English");
         await createCourse.entercode("CRS-" + generateCode());
        await createCourse.typeDescription(description);
        // domain = await createCourse.selectPortal();
        // console.log(`${domain}`);
        await createCourse.contentLibrary(); //By default Youtube content will be attached
        // await createCourse.clickHere();
        // await createCourse.selectImage();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })
    const title = FakerData.getCourseName();

    test(`Certification enroll and completion with single instance`, async ({ adminHome, learningPath, createCourse, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Certification enroll and completion with single instance` },
            { type: `Test Description`, description: `Verify Certification enroll and completion with single instance` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(title);
        await createCourse.entercode("CER-" + generateCode());
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
        await enrollHome.selectByOption("Certification");
        await enrollHome.selectBycourse(title)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage()

    })

    test(`Confirm that a learner is successfully registered for and complete a certification through a single-instance course.`, async ({ learnerHome, catalog, dashboard }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Confirm that a learner is successfully registered for the certification with a single-instance course.` },
            { type: `Test Description`, description: `Confirm that a learner is successfully registered for the certification with a single-instance course.` }
     );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
        await learnerHome.clickDashboardLink();
        await dashboard.clickLearningPath_And_Certification();
        await dashboard.clickCertificationLink();
        await dashboard.searchCertification(title);
        await dashboard.verifyTheEnrolledCertification(title);
       // await dashboard.clickMoreonTP(title);
        await catalog.clickMoreonCourse(title);
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await catalog.clickViewCertificate();
    })

})