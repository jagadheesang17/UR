import { URLConstants } from '../../../constants/urlConstants';
import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';
const courseAdmin: any = FakerData.getUserId();

const courseName = "Course"+" "+FakerData.getCourseName();
const description = FakerData.getDescription();

test.describe(`Check_request_walletcard_delivery_in_learnerside_by_completing_single_course_and_Verify_whether_the_request_walletcard_delivery_checked_or_not_in_the_user_creation_page_after_the_learner_checked_that`, async () => {
    test.describe.configure({ mode: "serial" });


test(`Create an user`, async ({ adminHome, createUser}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create user for portal 1` },
        { type: `Test Description`, description: `Verify that user is created for portal 1` }
    );   
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.clickCreateUser();    
        await createUser.verifyCreateUserLabel();    
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", courseAdmin);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.selectTimeZone("USA","Pacific Standard");
        await createUser.clickSave();               
        await createUser.verifyUserCreationSuccessMessage();
    }

    
)


    test(`Create the EL Course as an admin`, async ({ createCourse, adminHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify creation of future ILT Class ` },
            { type: `Test Description`, description: `Verify creation of future ILT Class` }
        );
       
        await adminHome.loadAndLogin("SUPERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })




test(`Check and verify the request wallet card delivey by completing the single course`, async ({ learnerHome,createUser,profile,catalog}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verify that user address validation functionality working as expected` },
        { type: `Test Description`, description: `Verifying user address validation functionality working as expected` }
    );   

        await learnerHome.clearBrowserCache(URLConstants.leanerURL);
        await learnerHome.basicLogin(courseAdmin, "Portal");
        await learnerHome.termsAndConditionScroll();

            await learnerHome.clickCatalog();
            await catalog.mostRecent();
            await catalog.searchCatalog(courseName);
            await catalog.clickMoreonCourse(courseName);
            await catalog.clickSelectcourse(courseName);
            await catalog.clickEnroll();
            await catalog.clickLaunchButton();
            await catalog.saveLearningStatus();
           
    
            await profile.clickProfile();
            await profile.clickOneProfile();
            await createUser.checkRequestWalletCardDelivery();
            await profile.proceedandVerifyTheCheckboxAfterCompletingTheCourse();
            await profile.clickOneProfile();
            await profile.verifyRequestPhysicalWalletCardDeliveryCheckbox();
}
)


test(`Verify the request wallet card delivery checkbox in user creation page after the learner checked from learner side`, async ({ adminHome, createUser }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create user for portal 1` },
        { type: `Test Description`, description: `Verify that user is created for portal 1` }
    );   
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(courseAdmin);  
        await createUser.editIcon();
        await createUser.verifyTheWalletcardDeliveryIsChecked();
 
    }

    
)
}
)
