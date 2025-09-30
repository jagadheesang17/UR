import path from "path";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils"
import { credentialConstants } from "../../../constants/credentialConstants";
import { updateCronDataJSON } from "../../../utils/jsonDataHandler";
import { updateSingleInstanceAutoRegister } from "../DB/DBJobs";
import { URLConstants } from "../../../constants/urlConstants";
import { credentials } from "../../../constants/credentialData";
import { OrganizationPage } from "../../../pages/OrganizationPage";
import { generateCode } from "../../../data/apiData/formData";

let createdCode: any
const code = "CRS"+"-"+generateCode();
let courseName = ("Cron " + FakerData.getCourseName());
const user = credentials.LEARNERUSERNAME.username
test.describe(`Verify Elearning mandatory course flow`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Course Creation for  E-Learning work flow`, async ({ adminHome, createCourse, editCourse,createUser, learningPath,enrollHome,contentHome }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Arivazhagan P' },
            { type: 'TestCase', description: 'Course Creation for  E-Learning work flow' },
            { type: 'Test Description', description: "Verifying E-Learning workflow" }
        );

        const newData = {
            CRS010: courseName
        }
        updateCronDataJSON(newData)
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.entercode(code);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + courseName);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.modifyTheAccess();
        await createCourse.clickAccessButton();
        await createCourse.specificLearnerGroupSelection(URLConstants.LearnerGroup1);
        await createCourse.addSingleLearnerGroup(user);
        await createCourse.saveAccessButton();
        await createCourse. crsAccessSettings();
      //  await createCourse. clickSave();
        await editCourse.clickClose();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
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

    // test(`Test to execute CRON JOB`, async ({ }) => {

    //     test.info().annotations.push(
    //         { type: `Author`, description: `Arivazhagan P` },
    //         { type: `TestCase`, description: `Test to execute CRON JOB` },
    //         { type: `Test Description`, description: `Verify the CRON Job` }
    //     );


    //     await updateSingleInstanceAutoRegister();
    // })

})