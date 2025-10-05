import { log } from "console";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { updateCronDataJSON } from "../../../utils/jsonDataHandler";
import { URLConstants } from "../../../constants/urlConstants";
import { certificationExpiry_CronJob } from "../DB/DBJobs";
import { generateCode } from "../../../data/apiData/formData";



const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
const portal = URLConstants.portal1
let domain: any
test.describe(`Verify_certification_expiration_flow`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Elearning Single instance creation`, async ({ adminHome, createCourse }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael S` },
            { type: `TestCase`, description: `Elearning Single instance creation` },
            { type: `Test Description`, description: `Elearning Single instance creation` }

        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enterCode("CRS-" + generateCode());
        await createCourse.enter("course-title", courseName);
        await createCourse.getCourse();
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        /*   domain = await createCourse.selectPortal();
          console.log(`${domain}`); */
        await createCourse.selectDomainOption(portal);
        await createCourse.contentLibrary();
        await createCourse.clickHere();
        await createCourse.selectImage();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })


    const title = ("CRON " + FakerData.getCourseName());
    test(`Certification Creation With Single instance elearning attached`, async ({ adminHome, learningPath, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Certification Creation With Single instance elearning attached` },
            { type: `Test Description`, description: `Certification Creation With Single instance elearning attached` }
        );
        const newData = {
            TP020: title
        }
        updateCronDataJSON(newData)

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
    await learningPath.clickCreateCertification();
    await createCourse.enterCode("CRT-" + generateCode());
        await learningPath.title(title);
        await learningPath.description(description);
        await learningPath.language();
        await learningPath.hasRecertification();
        await learningPath.clickExpiresButton()
        await learningPath.clickSaveAsDraftBtn();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName);
        await learningPath.clickAddSelectCourse();
        await learningPath.clickDetailTab();
        await learningPath.addRecertificationCourse();
        await learningPath.saveRecertification(courseName);
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
    })



    test(`Verify that the learner can successfully register for and complete the certification program`, async ({ learnerHome, catalog }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Verify that the learner can successfully register for and complete the certification program` },
            { type: `Test Description`, description: `Verify that the learner can successfully register for and complete the certification program` }

        );

        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(title);
        await catalog.clickEnrollButton();
        await catalog.clickViewCertificationDetails();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await catalog.clickViewCertificate();


    })

    // test(`Cron job to make certification expiry`, async ({ }) => {

    //     test.info().annotations.push(
    //         { type: `Author`, description: `Ajay Michael` },
    //         { type: `TestCase`, description: `Test to execute CRON JOB` },
    //         { type: `Test Description`, description: `Verify the CRON Job` }
    //     );

    //     await certificationExpiry_CronJob();
    // })



})