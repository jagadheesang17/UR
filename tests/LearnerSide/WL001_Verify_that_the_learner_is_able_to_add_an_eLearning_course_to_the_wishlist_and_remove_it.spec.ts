import { test } from "../../customFixtures/expertusFixture"
import { FakerData } from '../../utils/fakerUtils';

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`Confirm that YouTube content functions correctly and as expected.`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Selvakumar B` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Youtube content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Youtube content` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })
    test(`Confirm that the learner can cancel their eLearning enrollment from the My Learning page`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Selvakumar B` },
            { type: `TestCase`, description: `Confirm that YouTube content functions correctly and as expected` },
            { type: `Test Description`, description: `Confirm that YouTube content functions correctly and as expected` }
        );
      // let courseName="Haptic Matrix Reboot";
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.addtoWishlist(); 
        await catalog.verifyAddedToWishlist(courseName);
        await learnerHome.clickCatalog();
        await catalog.wishlistCatalog(courseName); 
        await catalog.removewishlist();
        await catalog.verifyremoveWishlistTraining(courseName);
    })
})
