import { test } from '../../../customFixtures/expertusFixture';
import { generateCode } from '../../../data/apiData/formData';
import { readDataFromCSV } from '../../../utils/csvUtil';
import { FakerData } from '../../../utils/fakerUtils';

//const OrgName = FakerData.getOrganizationName()
test(`Verify that an organization can be successfully created with all required details`, async ({ adminHome, organization, CompletionCertification,createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify that an organization can be successfully created with all required details` },
        { type: `Test Description`, description: `Verify that an organization can be successfully created with all required details` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
   
    await adminHome.menuButton();
    await adminHome.people();
    await organization.organizationMenu()
    await organization.createOrganization();
    await organization.enterName("ORG"+"_"+FakerData.getOrganizationName()+" "+FakerData.getTagNames());
   await organization.selectOrgType("Internal");
  await createCourse.enterCode("ORG-" + generateCode());
    await organization.typeDescription();
    await organization.clickSave();
    await CompletionCertification.clickProceed();
    await createCourse.verifySuccessMessage();
}
)


