import { generateOauthToken } from "../../accessToken";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from '../../../utils/fakerUtils';
import { createAdminGroup, generateCode } from "../../../data/apiData/formData";
import { createAdminGroup_fn } from "../../groups";
import { credentials } from "../../../constants/credentialData";

let access_token: any;
let code: any;
let title: any;
let code1: any;
let title1: any;
let status = "active";
let admin_roles:any=[];

let included_users=credentials.NEWCUSTOMERADMIN.username;
//let valid_till: any= getFutureDate()
let valid_till: any= "10/05/2035"   //MM/DD/YYYY format


title = "AG"+' '+ FakerData.getCategory();
code = "AG"+' '+generateCode();
title1= "AG"+' '+FakerData.getCategory();
code1= "AG"+' '+generateCode();
const roleName = FakerData.getFirstName() + " Admin"
const roleName1 = FakerData.getFirstName() + " Admin"

 //admin_roles=roleName,roleName1;


test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});


test.describe(`Verify the privileges and search functionality`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Verify the Custom role creation with all privileges `, async ({ adminHome, adminGroup, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `Testcase`, description: `Verify the Custom role creation` },
            { type: `Test Description`, description: `Verify the Custom role creation` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.clickAdminRole()
        await adminRoleHome.clickAddAdminRole()
        await adminRoleHome.enterName(roleName);
        await adminRoleHome.clickAllPriveileges();
        await adminRoleHome.clickSave()
        await adminRoleHome.verifyRole(roleName)
    })
test(`2_Verify the Custom role creation with all privileges `, async ({ adminHome, adminGroup, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `Testcase`, description: `Verify the Custom role creation` },
            { type: `Test Description`, description: `Verify the Custom role creation` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.clickAdminRole()
        await adminRoleHome.clickAddAdminRole()
        await adminRoleHome.enterName(roleName1);
        await adminRoleHome.clickAllPriveileges();
        await adminRoleHome.clickSave()
        await adminRoleHome.verifyRole(roleName1)
         await admin_roles.push(roleName,roleName1);
    })


test('Verify that a group can be created using the `createGroupAPI`', async () => {

    await createAdminGroup_fn(createAdminGroup(title,code,admin_roles,status,), { Authorization: access_token });   
});

test('Verify that a group can be created with users and validity using the `createGroupAPI`', async () => {

    await createAdminGroup_fn(createAdminGroup(title1,code1,admin_roles,status,included_users,valid_till), { Authorization: access_token });   
    console.log("Group created successfully with included users and valid till date");
    console.log(included_users);
    console.log(valid_till);
});

})