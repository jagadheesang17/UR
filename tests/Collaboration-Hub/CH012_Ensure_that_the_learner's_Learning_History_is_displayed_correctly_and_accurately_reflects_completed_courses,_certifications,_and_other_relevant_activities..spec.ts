import { credentials } from "../../constants/credentialData";
import { test } from "../../customFixtures/expertusFixture";


const courseType = ["Course", "Certification", "Learning Path"]
for (const data of courseType) {
    test(`verify all the ${data} is visible`, async ({ learnerHome, managerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `vidya` },
            { type: `TestCase`, description: `Manager verification` },
            { type: `Test Description`, description: `verify all the ${data} is visible` }
        );
        await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
      await learnerHome.selectCollaborationHub();
        await managerHome.clickViewLearning(credentials.TEAMUSER2.username);
        await managerHome.verifyallCourses(data);
    })
}

