import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { generateCode } from "../../../data/apiData/formData";
import { FakerData } from "../../../utils/fakerUtils";

let courseName = FakerData.getCourseName();
//let courseName = "Solid state Monitor Synthesize";
let description = FakerData.getDescription();
let domain: any
let contentName: any;

test.describe(`Verify that a Certification already marked as Completed by the admin does not revert to In Progress when accessed by the learner cert`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of E-learning single instance `, async ({ adminHome, createCourse }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Verify that a Certification already marked as Completed by the admin does not revert to In Progress when accessed by the learner cert` },
            { type: `Test Description`, description: `Verify that a Certification already marked as Completed by the admin does not revert to In Progress when accessed by the learner cert` }

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
        contentName = await createCourse.getAttachedContentName()

        await createCourse.clickHere();
        await createCourse.selectImage();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })

    const title = FakerData.getCourseName();
 // const title = "Solid state Microchip Transmit_Copy3";

    test(`The admin enrolls the learner and marks the certification as completed.`, async ({ adminHome, learningPath, createCourse, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `The admin enrolls the learner and marks the certification as completed.` },
            { type: `Test Description`, description: `The admin enrolls the learner and marks the certification as completed.` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(title);
        await learningPath.description(description);
          await createCourse.entercode("CER-" + generateCode());
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
        await enrollHome.verifytoastMessage();
        await enrollHome.clickModifyEnrollBtn();
        await enrollHome.selectEnrollOrCancel("Completed");
        await enrollHome.completionDateInAdminEnrollment();
        await enrollHome.verifytoastMessage();

    })

    test(`Verify that a certification already marked as 'Completed' by the admin does not revert to 'In Progress' when accessed by the learner`, async ({ learnerHome, catalog, dashboard }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Verify that a certification already marked as 'Completed' by the admin does not revert to 'In Progress' when accessed by the learner` },
            { type: `Test Description`, description: `Verify that a certification already marked as 'Completed' by the admin does not revert to 'In Progress' when accessed by the learner` }
        );

        await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
        await learnerHome.clickDashboardLink();
        await dashboard.clickLearningPath_And_Certification();
        await dashboard.clickCertificationLink();
        await dashboard.searchCertification(title);
        await dashboard.verifyTheEnrolledCertification(title);
        await catalog.clickMoreonCourse(title);
        await catalog.verifyStatus("Completed");
        await catalog.verifyTPOverallProgressPercentage();
        await catalog.verifytpCourseStatus(courseName, "Completed");
        await catalog.clickLaunchButton();
       // await catalog.saveLearningStatus();
       await catalog.saveLearningStatusBookmark();
        await catalog.verifyStatus("Completed");
        await catalog.verifyTPOverallProgressPercentage();
        await catalog.verifytpCourseStatus(courseName, "Completed");
      //  await catalog.verifyContentProgressValue(contentName);
        await catalog.clickViewCertificate();
    })

})