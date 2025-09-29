
import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"

//Username based enrollment:-
test(`Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.` },
        { type: `Test Description`, description: `Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.` }
    );
    const title = data.CRS005
    await learnerHome.learnerLogin("LEARNERUSERNAME", "default");
    await learnerHome.clickMyLearning();
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title);
    await catalog.verifyCompletedCourse(title);  

})

//Group based enrollment:-
test(`Validate that the learner is successfully enrolled (Group) in the eLearning compliance course through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, catalog,dashboard }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.` },
        { type: `Test Description`, description: `Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.` }
    );
    const title = data.CRS005
    await learnerHome.learnerLogin("LearnerGroup1user", "default");
    await learnerHome.clickMyLearning();
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title);
    await catalog.verifyCompletedCourse(title);  
    await dashboard.verifyComplianceCourse();
    await catalog.verifyEnrolledCourseByTitle(title);
    await dashboard.verifyComplianceCourse();

})

//Group based enrollment
//Learner user is belongs to the another group
test(`Validate that the learner is not enrolled in the eLearning compliance course through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Validate that the learner is not enrolled in the eLearning compliance course through the execution of the auto-register cron job.` },
        { type: `Test Description`, description: `Validate that the learner is not enrolled in the eLearning compliance course through the execution of the auto-register cron job.` }
    );
    const title = data.CRS005
    await learnerHome.learnerLogin("LearnerGroup2user", "default");
    await learnerHome.clickMyLearning();
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title);
    await catalog.mylearningNoResultsFound();


})