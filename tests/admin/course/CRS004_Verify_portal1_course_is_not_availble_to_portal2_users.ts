import { create } from "domain";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { URLConstants } from "../../../constants/urlConstants";
import { generateCode } from "../../../data/apiData/formData";
import { credentials } from "../../../constants/credentialData";



const code = "CRS" + "-" + generateCode();
let createdCode: any
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
//test.use({ storageState: "logins/expertuslearnerLog.json"})
test.describe(`Verify portal1 course is not availble to portal2 users`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse, learningPath ,enrollHome,contentHome }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
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
    await createCourse.entercode(code);
        await createCourse.getCourse();
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.selectDomainOption(URLConstants.portal1);
        await createCourse.contentLibrary(); //Youtube content will be attached here
        await createCourse.clickHere();
        await createCourse.selectImage();
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


    test(`Verify Course Visibility is Limited to the Assigned Portal`, async ({ learnerHome, catalog }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Verify Course Visibility is Limited to the Assigned Portal` },
            { type: `Test Description`, description: `Verify Course Visibility is Limited to the Assigned Portal` }

        );
        await learnerHome.learnerLogin("LEARNERPORTAL_2User", "Portal2");
                await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
       // await catalog.verifyEnrolledCourseByCODE(createdCode);
        await catalog.clickCourseInMyLearning(courseName);
        console.log(courseName)
        await catalog.verifyCourse(courseName);
       


    })
})