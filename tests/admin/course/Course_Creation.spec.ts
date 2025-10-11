import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { generateCode } from "../../../data/apiData/formData";

// Minimal end-to-end course creation mapped to framework-level methods
// Mirrors conventions from existing CRS tests (login, navigate, create, save)

test.describe("Course_Creation", () => {
  test.describe.configure({ mode: "serial" });

  test("Create single-instance E-Learning course with a video content and publish to catalog", async ({ adminHome, createCourse }) => {
    const courseName = FakerData.getCourseName();
    const code = `CRS-${generateCode()}`;

    // Admin login and navigation
    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();

    // Create course flow
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.entercode(code);
    await createCourse.typeDescription(`This is an auto-generated course: ${courseName}`);

    // Add content (simple video link) and enforce sequence
    await createCourse.contentLibrary();
    await createCourse.uploadVideoThroughLink();
    await createCourse.clickenforceSequence();

    // Publish and save
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
  });
});
