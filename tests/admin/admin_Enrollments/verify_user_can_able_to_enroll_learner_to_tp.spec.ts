// import { en } from "@faker-js/faker";
// import { credentialConstants } from "../../../constants/credentialConstants";
// import { credentials } from "../../../constants/credentialData";
// import { test } from "../../../customFixtures/expertusFixture"
// import { LearnerCoursePage } from "../../../pages/LearnerCoursePage";
// import { FakerData, getRandomSeat } from '../../../utils/fakerUtils';


// const courseName = FakerData.getCourseName();
// const sessionName = FakerData.getSession();
// const elCourseName = ("Elearning" + " " + FakerData.getCourseName());
// const description = FakerData.getDescription();
// let createdCode: any
// const instructorName = credentials.INSTRUCTORNAME.username
// test.describe(`Confirm that Admin enrollments functions correctly and as expected for ILT course`, () => {
//     test.describe.configure({ mode: "serial" });
//     test(`Creation of ILT Course`, async ({ adminHome, createCourse, editCourse,enrollHome,contentHome }) => {
//         test.info().annotations.push(
//             { type: `Author`, description: `Tamilvanan` },
//             { type: `TestCase`, description: `Create the course as multiple instance` },
//             { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }
//         );
//         await adminHome.loadAndLogin("CUSTOMERADMIN")
//         await adminHome.clickMenu("Course");
//         await createCourse.verifyCreateUserLabel("CREATE COURSE");
//         await createCourse.enter("course-title", courseName);
//         await createCourse.selectLanguage("English");
//         await createCourse.typeDescription(description);
//         await createCourse.selectdeliveryType("Classroom")
//         await createCourse.handleCategoryADropdown();
//         await createCourse.providerDropdown()
//         await createCourse.selectTotalDuration();
//         await createCourse.typeAdditionalInfo();
//         await createCourse.clickCatalog();
//         await createCourse.clickSave();
//         await createCourse.clickProceed();
//         await createCourse.verifySuccessMessage();
//         await createCourse.clickEditCourseTabs();
//         await createCourse.addInstances();

//         async function addinstance(deliveryType: string) {
//             await createCourse.selectInstanceDeliveryType(deliveryType);
//             await createCourse.clickCreateInstance();
//         }
//         await addinstance("Classroom");
//         await createCourse.enterSessionName(sessionName);
//         await createCourse.setMaxSeat();
//         await createCourse.enterDateValue();
//         await createCourse.startandEndTime();
//         await createCourse.selectInstructor(instructorName);
//         await createCourse.selectLocation();
//         await createCourse.clickCatalog();
//         await createCourse.clickUpdate();
//         await createCourse.verifySuccessMessage();
//         await contentHome.gotoListing();
//         await createCourse.catalogSearch(courseName)
//         createdCode = await createCourse.retriveCode()
//         console.log("Extracted Code is : " + createdCode);
//         await adminHome.menuButton()
//         await adminHome.clickEnrollmentMenu();
//         await adminHome.clickEnroll();
//         await enrollHome.selectBycourse(courseName)
//         await enrollHome.clickSelectedLearner();
//         await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
//         await enrollHome.clickEnrollBtn();
//         await enrollHome.verifytoastMessage()
//         await enrollHome.clickModifyEnrollBtn();
//         await enrollHome.clickEnrollToTp()
//         await enrollHome.searchUser(credentials.LEARNERUSERNAME.username)
//         await enrollHome.clickSearchUserCheckbox(credentials.LEARNERUSERNAME.username)
//         await enrollHome.clickSelectLearner()
        
        

//     })

     
// })

import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import {credentials} from '../../../constants/credentialData'


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentials.INSTRUCTORNAME.username

test.describe(`Certification_with_multi_instance_course_is_attached`, async()=>{
//     test.describe.configure({ mode: "serial" });
//     test(`Multi-Instance creation Classroom and Elearning`, async ({ adminHome, createCourse, editCourse }) => {
//         test.info().annotations.push(
//             { type: `Author`, description: `Ajay Michael` },
//             { type: `TestCase`, description: `Multi-Instance creation Classroom and Elearning` },
//             { type: `Test Description`, description: `Multi-Instance creation Classroom and Elearning` }

//         );

//         await adminHome.loadAndLogin("CUSTOMERADMIN")
//         await adminHome.clickMenu("Course");
//         await createCourse.verifyCreateUserLabel("CREATE COURSE");
//         await createCourse.enter("course-title", courseName);
//         await createCourse.selectLanguage("English");
//         await createCourse.typeDescription(description);
//         await createCourse.selectdeliveryType("Classroom")
   //   await createCourse.handleCategoryADropdown();
//         await createCourse.providerDropdown()
//         await createCourse.selectTotalDuration();
//         await createCourse.typeAdditionalInfo();
//         await createCourse.clickCatalog();
//         await createCourse.clickSave();
//         await createCourse.clickProceed();
//         await createCourse.editcourse();
//         await editCourse.clickClose();
//         await editCourse.clickTagMenu();
//         await editCourse.selectTags();
//         await editCourse.clickClose();
//         /* Need to Update the script due to Automation Site issue (20-6-2024) 15:26 */
//         // await editCourse.clickCompletionCertificate();
//         // await editCourse.selectCourseCompletionCertificate("Playwright Automation");
//         // await createCourse.clickCatalog();
//         // await createCourse.clickUpdate();
//         // await createCourse.verifySuccessMessage();
//         // await createCourse.clickEditCourseTabs();
       

//         async function addinstance(deliveryType: string) {
//             await createCourse.selectInstanceDeliveryType(deliveryType);
//             await createCourse.clickCreateInstance();
//            }
         
        
//            await createCourse.addInstances();
//             await addinstance("Classroom");
//       //  }
       
//         await createCourse.enterSessionName(sessionName);
//         await createCourse.setMaxSeat();
//         await createCourse.enterDateValue();
//         await createCourse.startandEndTime();
//         await createCourse.selectInstructor(instructorName);
//         await createCourse.selectLocation();
//         await createCourse.clickCatalog();
//         await createCourse.clickUpdate();
//         await createCourse.verifySuccessMessage();
//         await createCourse.editcourse();
//         await createCourse.clickinstanceClass();
//         await createCourse.addInstances();
//         await addinstance("E-Learning");
//         await createCourse.contentLibrary(); //By default Youtube content will be attached
//         await createCourse.clickCatalog();
//         await createCourse.clickUpdate();
//         await createCourse.verifySuccessMessage();

//     })


    const title = FakerData.getCourseName();
    test(`Creation of certification with multi instance course is attached`, async ({ enrollHome,adminHome, learningPath, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Creation of certification with multi instance course is attached` },
            { type: `Test Description`, description: `Creation of certification with multi instance course is attached` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
    await createCourse.catalogSearch("Bulk_Instance")

        // await learningPath.clickCreateCertification();
        // await learningPath.title(title);
        // await learningPath.description(description);
        // await learningPath.language();
        // await learningPath.clickSave();
        // await learningPath.clickProceedBtn();
        // await learningPath.clickAddCourse();
        // await learningPath.searchAndClickCourseCheckBox("Primary Capacitor Quantify");
        // await learningPath.clickAddSelectCourse();
        // await learningPath.clickDetailTab();
        // await learningPath.clickCatalogBtn();
        // await learningPath.clickUpdateBtn();
        // await learningPath.verifySuccessMessage();
        // await learningPath.clickEditCertification();
        // await createCourse.clickCompletionCertificate();
        // await createCourse.clickCertificateCheckBox();
        // await createCourse.clickAdd();
        // await learningPath.description(description);
        // await createCourse.clickCatalog();
        // await createCourse.clickUpdate();
        // await createCourse.verifySuccessMessage();
        //   await learningPath.clickEditCertification();
          await learningPath.clickResultEnrollmentButton()
        
        //  await enrollHome.selectBycourse(courseName)
        // await enrollHome.clickSelectedLearner();
        // await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        // await enrollHome.clickEnrollBtn();
        // await enrollHome.verifytoastMessage()
        // await enrollHome.clickModifyEnrollBtn();
        await enrollHome.clickEnrollToTp()
        await enrollHome.searchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickSearchUserCheckbox(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickSelectLearner()
        await enrollHome.searchandSelectTP("Bulk_Instance")
        await enrollHome.selectCls()
         await enrollHome.verifyLoadMoreButtonAndClick()
         await enrollHome.searchTPCourse("Fixtures")
        // Verify Load More button functionality
       
        
        // await enrollHome.clickEnrollBtn();
        // await enrollHome.verifytoastMessage()




    })


})