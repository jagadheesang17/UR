import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { generateCode } from '../../../data/apiData/formData';


let createdCode: any
const courseName = "ILT"+" "+FakerData.getCourseName();
const instanceName = "ILT"+" "+FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription()
const instructorName = credentials.INSTRUCTORNAME.username
const price = FakerData.getPrice();
const code = "CRS" + "-" + generateCode();
test.describe(`Confirm that Admin Order creation functions correctly and as expected for ILT Course`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of multi instnce ILT Course and Admin creates an order`, async ({ adminHome,catalog, costCenter,createCourse,enrollHome,contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of multi instnce ILT Course` },
            { type: `Test Description`, description: `Creation of multi instnce ILT Course` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.clickMenu("Course");
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.entercode(code);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.selectdeliveryType("Classroom")
        await createCourse.enterPrice(price)
        await createCourse.selectCurrency();
        // await createCourse.handleCategoryADropdown();
        // await createCourse.providerDropdown()
        await createCourse.selectTotalDuration();
        await createCourse.typeAdditionalInfo();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
        await createCourse.addInstances();

        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
            await createCourse.clickCreateInstance();
        }
        await addinstance("Classroom");
        await createCourse.enter("course-title", instanceName);
        await createCourse.enterSessionName(sessionName);
        await createCourse.setMaxSeat();
        await createCourse.enterDateValue();
        await createCourse.startandEndTime();
        await createCourse.selectInstructor(instructorName);
        await createCourse.selectLocation();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.filterByInstance("By Instance/Class")
        await catalog.clickApply()
        await createCourse.catalogSearch(instanceName)
        createdCode = await createCourse.retriveCode()
        console.log("Extracted Code is : " + createdCode);
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.manageEnrollment("Create Order")
        await enrollHome.selectMulticourseForSingleOrder(createdCode)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUserForSingleOrder(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickCheckoutButton();
        await costCenter.billingDetails("United States", "Alaska")
        await enrollHome.clickCalculateTaxButton()
        await enrollHome.paymentMethod("Credit Card");
        await costCenter.fillCreditDetails();
        await costCenter.clickTermsandCondition();
        await enrollHome.clickCreateOrder()
        await enrollHome.orderSuccessMsg();
    })

    test(`Verify that created course Enrollment status`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify that created course Enrollment status` },
            { type: `Test Description`, description: `Verify that created course Enrollment status` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(instanceName);
        await catalog.clickCourseInMyLearning(instanceName);
        await catalog.verifyStatus("Enrolled");
    })

})
