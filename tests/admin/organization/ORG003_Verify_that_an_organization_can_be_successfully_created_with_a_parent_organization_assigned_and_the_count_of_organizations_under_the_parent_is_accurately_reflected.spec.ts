import { expect } from '@playwright/test';
import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';
import { generateCode } from '../../../data/apiData/formData';
const OrgName=FakerData.getOrganizationName()

test(`Verify that an organization can be successfully created with a parent organization assigned and the count of organizations under the parent is accurately reflected`, async ({ adminHome,createCourse,contentHome,organization,CompletionCertification}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify that an organization can be successfully created with a parent organization assigned and the count of organizations under the parent is accurately reflected` },
        { type: `Test Description`, description: `Verify that an organization can be successfully created with a parent organization assigned and the count of organizations under the parent is accurately reflected` }
    );           
    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.people();
    await organization.organizationMenu()
   
    async function createOrg(){
    let orgName=OrgName+" "+FakerData.getLastName();
       await organization.createOrganization();   
      await organization.enterName(orgName)
      await organization.selectOrgType("Internal");
      await createCourse.enterCode("ORG-" + generateCode());
      await organization.typeDescription();
      await organization.clickSave();
      await CompletionCertification.clickProceed();    
      return orgName  
    }
    const parentOrg= await createOrg();
    await contentHome.gotoListing();
    const childOrg=  await createOrg();
    await contentHome.gotoListing();
    const org:any=await organization.childOrgCount(parentOrg);
    await organization.clickEditIcon(); 
    await organization.enterParentOrg(parentOrg);
    await organization.enterContactName();
    await organization.clickUpdate();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing()
    const org2:any=await organization.childOrgCount(parentOrg);
    expect(org).toBeLessThan(org2)  

}
    
)
