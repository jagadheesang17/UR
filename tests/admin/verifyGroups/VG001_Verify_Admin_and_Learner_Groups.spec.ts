import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";
import { URLConstants } from "../../../constants/urlConstants";
import { CatalogPage } from "../../../pages/CatalogPage";
import { generateCode } from "../../../data/apiData/formData";
// Alias to access values set on global in beforeAll without TS complaints
const g = global as any;

test.beforeAll(async () => {
    // Initialize test data before all tests
    global.courseAdmin = FakerData.getUserId();
    global.roleName = FakerData.getFirstName() + " Admin";
    global.groupTitle = FakerData.getFirstName() + " Admin";
    global.LearnergroupTitle = FakerData.getFirstName() + " Learner";
    global.groupTitle2 = FakerData.getFirstName() + " Admin";
    global.LearnergroupTitle2 = FakerData.getFirstName() + " Learner";
    global.courseName = "Cron " + FakerData.getCourseName();
    global.title = FakerData.getRandomTitle();
});
let learnerGroups: string[] = [ "All Learner - unitedrentals"];
let adminGroups: string[] = ["Super admin - E1"];
let learnerGroupsInAccess: string[] = [];
let adminGroupsInAccess: string[] = [];

test.describe.serial('Admin and Learner Groups Serial Tests', () => {

    test(`Creating user with seperate Admin and Learner groups`, async ({ adminHome, editCourse, createUser, learnerHome, adminRoleHome, adminGroup, createCourse, contentHome, learnerGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creating user with seperate groups` },
            { type: `Test Description`, description: `Creating user with seperate admin and learner groups` }
        );
        const newData = {
            courseAdmin: g.courseAdmin
        }
        updateFieldsInJSON(newData)
        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);

        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;
            await adminHome.loadAndLogin("SUPERADMIN")
            await adminHome.menuButton()
            await adminHome.people();
            await adminHome.user();
            await createUser.clickCreateUser();
            await createUser.verifyCreateUserLabel();
            await createUser.uncheckInheritAddressIfPresent();
            await createUser.uncheckInheritEmergencyContactIfPresent();
            await createUser.uncheckAutoGenerateUsernameIfPresent();
            await createUser.enter("first_name", FakerData.getFirstName());
            await createUser.enter("last_name", FakerData.getLastName());
            await createUser.enter("username", g.courseAdmin);
            await createUser.enter("user-password", "Welcome1@");
            await createUser.enter("email", FakerData.getEmail());
            await createUser.enter("user-phone", FakerData.getMobileNumber());
            await createUser.typeAddress("Address 1", FakerData.getAddress());
            await createUser.typeAddress("Address 2", FakerData.getAddress());
            await createUser.select("Country", country);
            await createUser.select("State/Province", state);
            await createUser.select("Time Zone", timezone);
            await createUser.select("Currency", currency);
            await createUser.enter("user-city", city);
            await createUser.enter("user-zipcode", zipcode);
            await createUser.enter("user-mobile", FakerData.getMobileNumber());
            await createUser.clickSave();
            await createUser.verifyUserCreationSuccessMessage();
            await contentHome.gotoListing();
        }

        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.clickAdminRole()
        await adminRoleHome.clickAddAdminRole()
    await adminRoleHome.enterName(g.roleName);
        await adminRoleHome.clickAllPriveileges();
        await adminRoleHome.clickSave()
    await adminRoleHome.verifyRole(g.roleName)
    });

    test(`Creating user with seperate Admin and Learner group`, async ({ adminHome, editCourse, createUser, learnerHome, adminRoleHome, adminGroup, createCourse, contentHome, learnerGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creating user with seperate groups` },
            { type: `Test Description`, description: `Creating user with seperate admin and learner groups` }
        );

        await adminHome.loadAndLogin("SUPERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.clickCreateGroup();
        await adminGroup.selectroleAdmin("Kaia Admin");
    await adminGroup.enterGroupTitle(g.groupTitle)
        await createCourse.entercode("GRP-" + generateCode());
    await adminGroup.searchUser(g.courseAdmin)
    await adminGroup.clickuserCheckbox(g.courseAdmin)
        await adminGroup.clickSelelctUsers();
        await adminGroup.clickActivate();
        await adminGroup.clickSave()
        await adminGroup.clickProceed();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();

        await adminGroup.clickCreateGroup();
        await adminGroup.selectroleAdmin("Kaia Admin");
    await adminGroup.enterGroupTitle(g.groupTitle2)
    await adminGroup.searchUser(g.courseAdmin)
        await createCourse.entercode("GRP-" + generateCode());
    await adminGroup.clickuserCheckbox(g.courseAdmin)
        await adminGroup.clickSelelctUsers();
        await adminGroup.clickActivate()
        await adminGroup.clickSave()
        await adminGroup.clickProceed();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
    adminGroups = await learnerGroup.addGroups(g.groupTitle, g.groupTitle2);
        console.log(adminGroups);
    });

    test(`Creating course and Verifying created groups`, async ({ adminHome, bannerHome, editCourse, createUser, adminGroup, createCourse, learnerHome, learnerGroup, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creating course and Verifying groups` },
            { type: `Test Description`, description: `Creating course and Verifying admin group` }
        );

        await adminHome.loadAndLogin("SUPERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickContentmenu();
        await contentHome.clickCreateContent();
    await contentHome.enter("content-title", g.title)
    await contentHome.enterDescription("AICC Content for " + g.title);
    await createCourse.entercode("CNT-" + generateCode());
        await contentHome.uploadContent("samplevideo.mp4");
        await bannerHome.clickPublish();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage()
        await contentHome.gotoListing();

        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", g.courseName);
        await createCourse.selectLanguage("English");
        await createCourse.entercode("CRS-" + generateCode());
    await createCourse.typeDescription("This is a new course by name :" + g.courseName);
        await createCourse.clickregistrationEnds();
    await createCourse.contentLibrary(g.title);
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.modifyTheAccess();
        await createCourse.clickAccessButton();
        adminGroupsInAccess=await adminGroup.getAdminGroups();
        learnerGroupsInAccess=await learnerGroup.getLearnerGroups();
        await learnerGroup.verifyGroups(learnerGroups,learnerGroupsInAccess);
        await learnerGroup.verifyGroups(adminGroups,adminGroupsInAccess)
    });

    test(`Creating user and Verifying created groups`, async ({ adminHome, bannerHome, createUser, adminGroup, createCourse, learnerHome, learnerGroup, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creating user and Verifying groups` },
            { type: `Test Description`, description: `Creating user and Verifying admin group` }
        );

        await adminHome.loadAndLogin("SUPERADMIN")
        const newData = {
            courseAdmin: g.courseAdmin
        }
        updateFieldsInJSON(newData)
        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);
        const newUser: any = FakerData.getUserId()

        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;
            await adminHome.menuButton()
            await adminHome.people();
            await adminHome.user();
            await createUser.clickCreateUser();
            await createUser.verifyCreateUserLabel();
            await createUser.uncheckInheritAddressIfPresent();
            await createUser.uncheckInheritEmergencyContactIfPresent();
            await createUser.uncheckAutoGenerateUsernameIfPresent();
            await createUser.enter("first_name", FakerData.getFirstName());
            await createUser.enter("last_name", FakerData.getLastName());
            await createUser.enter("username", newUser);
            await createUser.enter("user-password", "Welcome1@");
            await createUser.enter("email", FakerData.getEmail());
            await createUser.enter("user-phone", FakerData.getMobileNumber());
            await createUser.typeAddress("Address 1", FakerData.getAddress());
            await createUser.typeAddress("Address 2", FakerData.getAddress());
            await createUser.select("Country", country);
            await createUser.select("State/Province", state);
            await createUser.select("Time Zone", timezone);
            await createUser.select("Currency", currency);
            await createUser.enter("user-city", city);
            await createUser.enter("user-zipcode", zipcode);
            await createUser.enter("user-mobile", FakerData.getMobileNumber());
            await createUser.clickSave();
            // await createCourse.modifyTheAccess();
            // await createCourse.clickAccessButton();
            adminGroupsInAccess=await adminGroup.getAdminGroupsInUserPage();
            await learnerGroup.verifyGroups(adminGroups,adminGroupsInAccess)
        }
    });

    test(`Creating Certification and Verifying created groups`, async ({ adminHome, learningPath, bannerHome, createUser, adminGroup, createCourse, learnerHome, learnerGroup, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creating Certification and Verifying created groups` },
            { type: `Test Description`, description: `Creating Certification and Verifying created group` }
        );
        let description = FakerData.getDescription();
        const title = FakerData.getCourseName();

        await adminHome.loadAndLogin("SUPERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(title);
        await learningPath.description(description);
        await learningPath.language();
        await createCourse.entercode("CER-" + generateCode());
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
    await learningPath.searchAndClickCourseCheckBox(g.courseName);
        await learningPath.clickAddSelectCourse();
        await createCourse.clickAccessButton();
        adminGroupsInAccess=await adminGroup.getAdminGroups();
        learnerGroupsInAccess=await learnerGroup.getLearnerGroups();
        await learnerGroup.verifyGroups(learnerGroups,learnerGroupsInAccess);
        await learnerGroup.verifyGroups(adminGroups,adminGroupsInAccess)
    });

});
