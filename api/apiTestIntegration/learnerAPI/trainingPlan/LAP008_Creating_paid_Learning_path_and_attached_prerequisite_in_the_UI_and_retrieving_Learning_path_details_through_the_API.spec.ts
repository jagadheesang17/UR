import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture";
import { FakerData } from "../../../../utils/fakerUtils";
import { generateOauthToken } from "../../../accessToken";
import { retrive_ProgramDetails } from "../../../learnerSide/learnerProgramsAPI";



const price = FakerData.getPrice();
let courseName = FakerData.getCourseName();
let prerequisiteCourse = FakerData.getCourseName();
const description = FakerData.getDescription();
let access_token: string
let createdCode: any
let user = credentials.LEARNERUSERNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

    test.describe.configure({ mode: "serial" });
    test(`Creation of paid learning path with prerequisite`, async ({ adminHome, editCourse,createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of Elearning Course` },
            { type: `Test Description`, description: `Creation of Elearning Course` }
        );
        
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        //Creation of prerequisite course 1
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", prerequisiteCourse);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
         //Creation of main course with single instance
         await adminHome.menuButton();
         await adminHome.clickLearningMenu();
         await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course,:" + description);
        await createCourse.contentLibrary(); //By default Youtube content will be attached to the course
        await createCourse.clickCatalog(); 
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })
    let title = FakerData.getCourseName();

    test(`Creation of learning path with prerequisite`, async ({ adminHome,contentHome, learningPath, createCourse,editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of learning path with attached prerequisite` },
            { type: `Test Description`, description: `Creation of learning path with attached prerequisite` }
        )
        let tag: any
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickLearningPath();
        await learningPath.clickCreateLearningPath();
        await learningPath.title(title);
        await learningPath.description(description);
        await learningPath.language();
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
        await createCourse.enterPrice(price)
        await createCourse.selectCurrency();
        await createCourse.selectTotalDuration();
        await createCourse.typeAdditionalInfo();
        await createCourse.clickregistrationEnds();
        await createCourse.selectCompleteByRule();
        await createCourse.selectCompleteByDate();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName);
        await learningPath.clickAddSelectCourse();
        await editCourse.clickTagMenu();
        tag = await editCourse.selectTags();
        await editCourse.clickClose();
       //adding single prerequisite course
      // await learningPath.clickEditLearningPath()
       await createCourse.clickCourseOption("Prerequisite")
       await createCourse.addSinglePrerequisiteCourse(prerequisiteCourse);
       await learningPath.clickDetailTab();
       await learningPath.clickCatalogBtn();
       await learningPath.clickUpdateBtn();
       await learningPath.verifySuccessMessage();
       await contentHome.gotoListing();
       await createCourse.catalogSearch(title)
       createdCode = await createCourse.retriveCode()
       console.log("Extracted Code is : " + createdCode);
    })
    test(`Get created Learning path details`, async () => {
        await retrive_ProgramDetails(createdCode, user,{ Authorization: access_token })
    })