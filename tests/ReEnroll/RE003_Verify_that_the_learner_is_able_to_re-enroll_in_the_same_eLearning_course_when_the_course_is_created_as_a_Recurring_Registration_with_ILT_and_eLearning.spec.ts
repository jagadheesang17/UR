import { expect } from "@playwright/test";
import { test } from "../../customFixtures/expertusFixture";
import { FakerData, getRandomSeat } from "../../utils/fakerUtils";
import { credentials } from "../../constants/credentialData";
import { generateCode } from "../../data/apiData/formData";

let createdCode: any;
const courseName = FakerData.getCourseName();
const instanceName = FakerData.getCourseName();
const elCourseName = FakerData.getCourseName() + "E-learning";
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentials.INSTRUCTORNAME.username;
let addInstancepre: any;
let addInstancepost: any;
let tag: any;
test.describe(`TC103 Verify future Class recurring Registration`, async () => {
  test.describe.configure({ mode: "serial" });

  test(`TC103_Multiple Course Recurring registration for Future date`, async ({
    createCourse,
    adminHome,
    editCourse,
    enrollHome,
    contentHome,
  }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Vidya` },
      {
        type: `TestCase`,
        description: `Verify Multiple Course Creation for Classroom `,
      },
      {
        type: `Test Description`,
        description: `Multiple Course Creation for Classroom`,
      }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.enterCode("CRS-" + generateCode());
    await createCourse.typeDescription(description);
    await createCourse.selectdeliveryType("Classroom");
    await createCourse.handleCategoryADropdown();
    await createCourse.providerDropdown();
    await createCourse.selectTotalDuration();
    await createCourse.typeAdditionalInfo();
    addInstancepre = await createCourse.visiblityOfaddInstance();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.clickEditCourseTabs();
    await editCourse.clickTagMenu();
    tag = await editCourse.selectTags();
    console.log(tag);
    await editCourse.clickClose();
    // await createCourse.clickCatalog();
    // await createCourse.clickUpdate();
    // await createCourse.verifySuccessMessage();
    // await createCourse.clickEditCourseTabs();
    addInstancepost = await createCourse.visiblityOfaddInstance();
    expect(addInstancepost).not.toBe(addInstancepre);
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
    await createCourse.editcourse();
    await createCourse.clickinstanceClass();
    await createCourse.addInstances();
    await addinstance("E-Learning");
    await createCourse.enter("course-title", elCourseName);
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await editCourse.clickBusinessRule();
    await editCourse.clickcheckAllowRecReg();
    //await createCourse.clickUpdate();

    await contentHome.gotoListing();
    await createCourse.catalogSearch(elCourseName);
    createdCode = await createCourse.retriveCode();
    console.log("Extracted Code is : " + createdCode);
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();
    await enrollHome.selectBycourse(elCourseName);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
    await enrollHome.clickEnrollBtn();
    await enrollHome.verifytoastMessage();
  });

  test(`Verification from learner site`, async ({
    learnerHome,
    learnerCourse,
    catalog,
  }) => {
    test.info().annotations.push(
      { type: `Author`, description: `vidya` },
      { type: `TestCase`, description: `Learner Side Re-Enrollment` },
      {
        type: `Test Description`,
        description: `Verify that learner can reenroll the course`,
      }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await catalog.clickMyLearning();
    await catalog.searchMyLearning(elCourseName);
    await catalog.clickCourseInMyLearning(elCourseName);
    await catalog.clickMoreonCourse(elCourseName);
    await catalog.clickSelectcourse(courseName);
    await catalog.clickEnroll();
    await catalog.clickLaunchButton();
    await catalog.saveLearningStatus();
    await learnerCourse.clickReEnroll();
    await catalog.clickSelectcourse(courseName);
    await catalog.clickEnroll();
    await learnerCourse.reEnrollPopup();
    await catalog.clickLaunchButton();
    await catalog.saveLearningStatus();
    // await catalog.clickMyLearning();
    // await catalog.clickCompletedButton()
    // await catalog.verifyCompletedCourse(elCourseName)    // await catalog.searchMyLearning(elCourseName)
  });
});
