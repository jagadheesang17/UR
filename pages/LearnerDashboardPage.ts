import { FakerData, getCurrentDateFormatted } from "../utils/fakerUtils";

import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { LearnerHomePage } from "./LearnerHomePage";
import { th } from "@faker-js/faker";

export class LearnerDashboardPage extends LearnerHomePage {

    public selectors = {
        ...this.selectors,
        learningPathAndCertification: "//div[@id='mydashboard']//div[text()='Learningpath / Certification']",
        certification: "a:text-is('Certification')",
        certificationInput: "#exp-searchundefined input",
        verifyText: (titleName: string) => `//div[text()='${titleName}']`,
        recertifyIcon: (course: string) => `//div[text()='${course}']//following::i[contains(@class,'certificate')]`,
        pendingLabel: "//span[contains(text(),'Pending')]",
        verifyPendingCourse: (course: string) => `//span[contains(text(),'Pending')]//following::div[contains(text(),'${course}')]`,
        // mandatoryText: "//div[text()='Mandatory']",  //Not in use
        // complianceText: "//div[text()='Compliance']", //Not in use
        mdtryandcmplText: "//div[text()='Mandatory' or text()='Compliance']",
        verifyCerificate: (cerTitle: string) => `//span[contains(text(),'To complete')]/following::div[text()='${cerTitle}']`,
        //Learning History
        learningHistory: "//div[@id='mydashboard']//div[text()='Learning History']",
        courseInput: "#exp-searchlnr-search input",
        //Bookmark :-
        bookmarkLink: `//div[text()='Bookmarks']`,
        bookmarkSearchIcon: `//input[@id='exp-searchbookmarkeditems-search-field'] `,
        bookmarkVerification: (title: any) => `//div[@id='bookmarks']//h5[text()='${title}']`,
        removeBookmark: (title: any) => `(//h5[text()='${title}']//following::i[@aria-label='bookmarked'])[1]`,
        removeBookmarkPopup: `//button[text()='Yes']`,
        boomarkPageLinks: (linkName: string) => `//a[text()='${linkName}']`, //Content|Certification|Learning Path

        //Learner Dashboard Page
        dashboardItems: (itemName: string) => `//div[@id='mydashboard']//div[text()='${itemName}']`,
        inaTabs: (tabName: String) => `//a[contains(text(),'${tabName}')]`,
        reminderBuckets: (bucket: String) => `//p[contains(text(),'${bucket}')]`,
        verifyTitle: (title: string) => `//p[contains(text(),'List of class that have been changed')]//following::p[contains(text(),'${title}')]`,

        //click more on TP

        clickMore: (data: string) => `(//div[text()='${data}']//following::i[@aria-label='More'])[1]`,
        titleClick: (title: string) => `//div[contains(text(),'${title}')]`,


    }

    //To Navigate to Bookmark->Content/Certification/Learning Path pages
    async navigateBookmarkLinks(linkName: string) {
        await this.wait("minWait");
        await this.click(this.selectors.boomarkPageLinks(linkName), "Bookmark Page Link", "Link");

    }

    async clickBookmarkLink() {
        await this.wait("mediumWait");
        await this.click(this.selectors.bookmarkLink, "Bookmark Link", "Link");
    }

    async bookMarkSearch(title: string) {
        await this.spinnerDisappear();
        await this.wait("minWait");
        await this.click(this.selectors.bookmarkSearchIcon, "Bookmark Link", "Link");
        await this.typeAndEnter(this.selectors.bookmarkSearchIcon, "Search Text", title);
    }

    async bookmarkVerification(title: any) {
        await this.wait("minWait");
        await this.validateElementVisibility(this.selectors.bookmarkVerification(title), "Bookmark Verification");
        await this.mouseHoverandClick(this.selectors.bookmarkVerification(title), this.selectors.bookmarkVerification(title), "Bookmark Search", "Bookmark Search");
    }
    async bookmarkRemove(title: any) {
        await this.spinnerDisappear();
        await this.wait("minWait");
        await this.click(this.selectors.bookmarkSearchIcon, "Bookmark Link", "Link");
        await this.typeAndEnter(this.selectors.bookmarkSearchIcon, "Search Text", title);
        await this.click(this.selectors.removeBookmark(title), "Bookmark Removed", "Bookmark Icon");
        await this.click(this.selectors.removeBookmarkPopup, "Remove Bookmark", "Popup")
    }
    async clickLearningPath_And_Certification() {
        await this.wait('minWait');
        await this.validateElementVisibility(this.selectors.learningPathAndCertification, "LearningPath and Certification");
        await this.wait('minWait');
        await this.click(this.selectors.learningPathAndCertification, "LearningPath and Certification", "Button");
    }

    //Course search in learning history
    async learningHistoryCourseSearch(data: string) {
        await this.validateElementVisibility(this.selectors.courseInput, "Search Field");
        await this.typeAndEnter(this.selectors.courseInput, "Search Field", data);
        await this.wait('maxWait');
    }

    async clickCertificationLink() {
        await this.page.waitForLoadState('load');
        await this.validateElementVisibility(this.selectors.certification, "Certification");
        await this.wait('mediumWait');
        await this.click(this.selectors.certification, "Certification", "Link");
        await this.wait('mediumWait');
    }

    async clickRecertifyIcon(data: string) {
        await this.mouseHover(this.selectors.recertifyIcon(data), "Recertify Icon");
        await this.click(this.selectors.recertifyIcon(data), "Recertify Icon", "Icon")
    }

    async searchCertification(data: string) {
        await this.validateElementVisibility(this.selectors.certificationInput, "Search Field");
        await this.page.locator("//span[contains(text(),'To complete')]").scrollIntoViewIfNeeded()
        await this.wait('maxWait');
        await this.typeAndEnter(this.selectors.certificationInput, "Search Field", data);
        await this.wait('mediumWait');
    }

    async verifyTOCompleteCert(cerTitle: string) {
        await this.validateElementVisibility(this.selectors.verifyCerificate(cerTitle), "Cerificate")
    }

    async verifyComplianceCourse() {
        await this.wait('mediumWait');
        let visibleCompliance = await this.page.locator(this.selectors.mdtryandcmplText).nth(0).innerText({ timeout: 10000 });
        expect(visibleCompliance).toBe("COMPLIANCE")
    }

    async verifyTheEnrolledCertification(data: string) {
        await this.validateElementVisibility(this.selectors.verifyText(data), "Certification");
        await this.verification(this.selectors.verifyText(data), data);
    }

    async pendingTab(course: string) {
        await this.wait('mediumWait');
        //await this.mouseHover(this.selectors.pendingLabel, "Pending");
        await this.fillAndEnter(this.selectors.certificationInput, "Input", course);
        await this.validateElementVisibility(this.selectors.pendingLabel, "Pending");;
        await this.verification(this.selectors.verifyPendingCourse(course), course)
    }

    //Dashboard Items
    async selectDashboardItems(itemName: string) {
        await this.validateElementVisibility(this.selectors.dashboardItems(itemName), "Dashboard");
        await this.click(this.selectors.dashboardItems(itemName), "itemName", "link");
    }

    //INA tabs
    async selectINATabs(tabName: string) {
        await this.validateElementVisibility(this.selectors.inaTabs(tabName), "INA");
        await this.click(this.selectors.inaTabs(tabName), "tabName", "tab");
    }

    //INA reminder buckets
    async verifyINAReminder(bucket: string, title: string) {
        await this.validateElementVisibility(this.selectors.reminderBuckets(bucket), "Sub Title");
        await this.wait("minWait");
        await this.validateElementVisibility(this.selectors.verifyTitle(title), title);
    }

    async clickMoreonTP(title: string) {
        await this.validateElementVisibility(this.selectors.clickMore(title), "Click More");
        await this.click(this.selectors.clickMore(title), "Click More", "Link");

    }

    async clickTitle(title: string) {
        await this.wait("minWait");
        await this.mouseHover(this.selectors.titleClick(title), "Title");
        await this.click(this.selectors.titleClick(title), "Title", "");
    }





}