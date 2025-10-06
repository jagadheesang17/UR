import { ca } from "date-fns/locale";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { generateCode } from '../../../data/apiData/formData';

let courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
const code = "CRS" + "-" + generateCode();
test.describe(`Verify that the Max Seat Override functionality is working as expected for the eLearning course`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Verifying that the Max Seat Override functionality is working as expected for the eLearning course`, async ({ siteAdmin,adminHome,learnerHome}) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that the 'Seat Max Override' has been enabled from the site settings` },
            { type: `Test Description`, description: `Confirm that the 'Seat Max Override' has been enabled in the site settings` }
    
        );
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.clickBusinessRulesEditIcon()
        await siteAdmin.maxSeatOverRideInBusinessRules();
        
    });
    test(`Creation of Single Instance Elearning`, async ({ adminHome, createCourse,enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.entercode(code);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.setSeatsMax('1')
        await createCourse.contentLibrary()
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        //admin enrollment flow
                await adminHome.menuButton()
                await adminHome.clickEnrollmentMenu();
                await adminHome.clickEnroll();
                await enrollHome.selectBycourse(courseName)
                await enrollHome.clickSelectedLearner();
                await enrollHome.enterSearchUser(credentials.TEAMUSER1.username)
                await enrollHome.enterSearchUser(credentials.TEAMUSER2.username)
                await enrollHome.clickEnrollBtn();
                await enrollHome.verifyMaxSeatOverRidePopup();
                await enrollHome.verifytoastMessage()
    })


    test.skip(`Confirm that the 'No seats left' message is showing on the learner side`, async ({ learnerHome, catalog, readContentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that the 'No seats left' message is displayed on the learner side` },
            { type: `Test Description`, description: `Verifying on the learner side that the 'Seat Full' text is displayed on the course details page` }
        );
      
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.verifySeatFullText(courseName)

    })

})
