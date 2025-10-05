import { test } from "../../../customFixtures/expertusFixture";
import { generateOauthToken } from "../../accessToken";
import { generateCode, getListCategory } from "../../../data/apiData/formData";
import { listCategory } from "../../metaDataLibraryAPI";
import { FakerData } from "../../../utils/fakerUtils";

let code: any;
let access_token: string;
let categoryCode: any;
let order="new-old"
test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

   const categoryName: any = "API" + FakerData.getCategory();
    test(`Ensure that a new category can be created successfully`, async ({ adminHome, createCourse,metadatalibrary }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Tamilvanan' },
            { type: 'TestCase', description: 'Ensure that a new category can be created successfully' },
            { type: 'Test Description', description: "Ensure that a new category can be created successfully" }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN1")
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.metadataLibrary();
        await adminHome.meta_learning();
        await metadatalibrary.addCategory();
        await metadatalibrary.name(categoryName);
        await metadatalibrary.description(FakerData.getDescription());
        await metadatalibrary.saveButton();
        await metadatalibrary.categorySearchfield(categoryName);
        await metadatalibrary.verifyCategory(categoryName)
        await metadatalibrary.clickEditIcon(categoryName);
        code = await createCourse.retriveCodeOnCreationPage()
    })


test('List of Category', async () => {
    categoryCode = await listCategory(order,{ Authorization: access_token });
});


