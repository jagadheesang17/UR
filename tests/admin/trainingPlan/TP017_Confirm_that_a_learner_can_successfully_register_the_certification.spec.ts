import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { generateCode } from "../../../data/apiData/formData";
import { credentials } from "../../../constants/credentialData";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
let domain: any
//test.use({ storageState: "logins/expertuslearnerLog.json"})
test.describe(`Certification_with_single_instance_behavior_Enrolled_tab`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of single instance-elearning`, async ({ adminHome, createCourse }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Creation of single instance-elearning` },
            { type: `Test Description`, description: `Creation of single instance-elearning` }

        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.entercode("CRS-" + generateCode());
        await createCourse.getCourse();
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.contentLibrary();
        await createCourse.clickHere();
        await createCourse.selectImage();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
        await createCourse.typeDescription(description);
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
    })

    const title = FakerData.getCourseName();
    test(`Creation of Certification with single instance`, async ({ adminHome,enrollHome, learningPath, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Creation of Certification with single instance` },
            { type: `Test Description`, description: `Creation of Certification with single instance` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
    await learningPath.clickCreateCertification();
    await createCourse.entercode("CRT-" + generateCode());
        await learningPath.title(title);
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

    test(`Confirm that a learner can successfully register the certification`, async ({ learnerHome, catalog, dashboard }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Confirm that a learner can successfully register the certification` },
            { type: `Test Description`, description: `Certification should be available in the enrolled tab` }

        );

      await learnerHome.learnerLogin("LEARNERUSERNAME", "leanerURL");
        await learnerHome.clickDashboardLink();
        await dashboard.clickLearningPath_And_Certification();
        await dashboard.clickCertificationLink();
        await dashboard.searchCertification(title);
        await dashboard.verifyTheEnrolledCertification(title);
        await catalog.clickMoreonCourse(title);

    })

})