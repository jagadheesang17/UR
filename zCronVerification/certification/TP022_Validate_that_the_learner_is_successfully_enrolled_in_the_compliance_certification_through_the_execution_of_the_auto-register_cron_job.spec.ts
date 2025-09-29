import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"

test(`TC073_Validate_that_the_learner_is_successfully_enrolled_in_the_compliance_certification_through_the_execution_of_the_auto-register_cron_job.spec.ts`, async ({ learnerHome, dashboard, catalog }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Veriy a certification expiration` },
        { type: `Test Description`, description: `Verify from learner side` }
    );
    let title = data.TP022
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await dashboard.verifyComplianceCourse()
})

//Group based enrollment:-
test(`TC073_Validate that the learner is successfully enrolled (Group) in the eLearning compliance course through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, catalog, dashboard }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.` },
        { type: `Test Description`, description: `Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.` }
    );
    const title = data.TP022
    await learnerHome.learnerLogin("LearnerGroup1user", "default");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await dashboard.verifyComplianceCourse();

})

//Group based enrollment
//Learner user is belongs to the another group
test(`TC073_Validate that the learner is not enrolled in the eLearning compliance course through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome,dashboard,catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.` },
        { type: `Test Description`, description: `Validate that the learner is successfully enrolled in the eLearning compliance course through the execution of the auto-register cron job.` }
    );
    const title = data.TP022;
    await learnerHome.learnerLogin("LearnerGroup2user", "default");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
   // await dashboard.verifyComplianceCourse();
    await catalog.mylearningNoResultsFound();


})