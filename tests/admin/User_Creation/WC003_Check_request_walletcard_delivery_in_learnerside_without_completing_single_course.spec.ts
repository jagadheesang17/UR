// import { URLConstants } from '../../../constants/urlConstants';
// import { test } from '../../../customFixtures/expertusFixture';
// import { FakerData } from '../../../utils/fakerUtils';
// const courseAdmin: any = FakerData.getUserId();


// test.describe(`Configure_the_request_walletcard_delivery_in_config_file`, async () => {
//     test.describe.configure({ mode: "serial" });

// test(`Create an user`, async ({ adminHome, createUser ,createCourse}) => {
//     test.info().annotations.push(
//         { type: `Author`, description: `Vidya` },
//         { type: `TestCase`, description: `Create user for portal 1` },
//         { type: `Test Description`, description: `Verify that user is created for portal 1` }
//     );   
//         await adminHome.loadAndLogin("SUPERADMIN");
//         await adminHome.menuButton();
//         await adminHome.people();
//         await adminHome.user();
//         await createUser.clickCreateUser();    
//         await createUser.verifyCreateUserLabel();    
//         await createUser.enter("first_name", FakerData.getFirstName());
//         await createUser.enter("last_name", FakerData.getLastName());
//         await createUser.enter("username", courseAdmin);
//         await createUser.enter("user-password", "Welcome1@");
//         await createUser.selectTimeZone("USA","Pacific Standard");
//         // await createUser.select("State/Province", "Alaska");
//         // await createUser.checkRequestWalletCardDelivery();
//         await createUser.clickSave();               
//         // await createUser.clickProceed("Proceed");
//         await createUser.verifyUserCreationSuccessMessage();
//     }

    
// )
// test(`Verify the learner can able to select the "Request Wallet Card Delivery" option by completing one course.`, async ({ learnerHome,createUser,profile}) => {
//     test.info().annotations.push(
//         { type: `Author`, description: `Tamilvanan` },
//         { type: `TestCase`, description: `Verify that user address validation functionality working as expected` },
//         { type: `Test Description`, description: `Verifying user address validation functionality working as expected` }
//     );   
//         await learnerHome.clearBrowserCache(URLConstants.leanerURL);
//         await learnerHome.basicLogin(courseAdmin, "Portal");
//         await learnerHome.termsAndConditionScroll();
//         await profile.clickProfile();
//         await profile.clickOneProfile();
//         await createUser.checkRequestWalletCardDelivery();
//         await profile.verifyTheErrorMessageWhenTheAdminNotCompleteSingleCourse();
        
    
//     }
// )
// }
// )