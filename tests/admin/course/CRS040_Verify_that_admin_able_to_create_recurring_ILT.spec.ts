import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from '../../../utils/fakerUtils';
import { URLConstants } from "../../../constants/urlConstants";
import { generateCode } from '../../../data/apiData/formData';


const courseName = FakerData.getCourseName();
const instanceName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
let createdCode: any
const instructorName = credentials.INSTRUCTORNAME.username
const pageUrl = URLConstants.adminURL;
const code = "CRS" + "-" + generateCode();
test.describe(`Confirm that admin able to create recurring session for ILT course`, () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of ILT Course`, async ({ adminHome, createCourse, editCourse,enrollHome,contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create the course as multiple instance` },
            { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
     //  await adminHome.clearBrowserCache(pageUrl)
        await adminHome.clickMenu("Course");
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.entercode(code);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.selectdeliveryType("Classroom")
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
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
        await createCourse.entercode("CRS1-" + generateCode());
        await createCourse.enterSessionName(sessionName);
        await createCourse.setMaxSeat();
        await createCourse.selectSessionType()
        await createCourse.enterDateValue();
        await createCourse.startandEndTime();
        await createCourse.enterEndDateValue();
        await createCourse.selectLocation();
        await createCourse.selectInstructor(instructorName);
        await createCourse.selectAllDays();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
             await adminHome.menuButton()
                await adminHome.clickEnrollmentMenu();
                await adminHome.clickEnroll();
                await enrollHome.selectBycourse(instanceName)
                await enrollHome.clickSelectedLearner();
                await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
                await enrollHome.clickEnrollBtn();
                await enrollHome.verifytoastMessage()

    })

        test.skip(`Verify that learner able to enroll in created course`, async ({ learnerHome, catalog }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Tamilvanan` },
                { type: `TestCase`, description: `Verify that learner able to enroll in created course` },
                { type: `Test Description`, description: `Verify that learner able to enroll in created course` }
            );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(instanceName);
        await catalog.clickCourseInMyLearning(instanceName);
        await catalog.clickSessionConflictPopup();
    })

})