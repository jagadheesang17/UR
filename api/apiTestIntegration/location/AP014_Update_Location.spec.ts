import { test } from "../../../customFixtures/expertusFixture"
import { generateOauthToken } from "../../accessToken";
import { getListofLocation, listSingleLocation, locationCreation, updateLocation } from "../../locationAPI";
import { locationCreationData } from "../../../data/apiData/formData";
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";

let access_token: any;
let Location_id:any;
let locationName=FakerData.getLocationName();

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Testing UserCEUAPI Functionality', () => {
   test('Create Location', async () => {
        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);
        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;
        Location_id = await locationCreation(locationCreationData(locationName,country,state,timezone,city,zipcode), { Authorization: access_token });
        console.log(Location_id);
        }
    });
    test(`Verify created Location`, async ({ adminHome, location }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify created Location` },
            { type: `Test Description`, description: `Verify the created Location` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.locationLink();
        await location.verifyLocationLabel();
        await location.verifyCreatedLocation(locationName)
    })

    test('Get created location', async () => {
       let locationDeatails: any = await listSingleLocation(locationName, { Authorization: access_token });
       console.log(locationDeatails)
    });
        test('Update the created Location ', async () => {
            let updatedLocation = await updateLocation(locationName, { Authorization: access_token });
            console.log(updatedLocation);
    
        });

        test(`Verify Updated Location`, async ({ adminHome, location }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Tamilvanan` },
                { type: `TestCase`, description: `Verify Updated Location` },
                { type: `Test Description`, description: `Verify the Updated Location` }
            );
            await adminHome.loadAndLogin("CUSTOMERADMIN")
            await adminHome.menuButton();
            await adminHome.clickLearningMenu();
            await adminHome.locationLink();
            await location.verifyLocationLabel();
            await location.verifyCreatedLocation(locationName)
        })


});





