import { BrowserContext, expect, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { URLConstants } from "../constants/urlConstants";
import { FakerData, getCurrentDateFormatted } from "../utils/fakerUtils";


export class EnrollmentPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        manageEnrollement: `(//div[@id='wrapper-enrollment-action']//div)[1]`,
        enrollType: `//span[text()='Enroll']`,
        searchcourseOrUser: `//input[contains(@id,'exp-search')]`,
        noResultFound:`//h3[text()='No matching result found.']`,
        courseList: `//div[contains(@id,'exp-search-lms')]//li`,
        courseListOpt: (index: number) => `(//div[contains(@id,'exp-search-lms')]//li)[${index}]`,
        userList: `(//div[contains(@id,'lms-scroll-results')]//li)`,
        userListOpt: (index: number) => `(//div[contains(@id,'lms-scroll-results')]//li)[${index}]`,
        selectCourse: `(//input[contains(@id,'training')]/following::i)[1]`,
        selectedLearners: `//button[text()='Select Learner']`,
       // selectUser: `(//input[contains(@id,'selectedlearners')]/following::i)[2]`,
         selectUser: (data: string) => `(//td[contains(text(),'${data}')]//following::i[contains(@class,'fa-square icon')])[1]`,
        enrollBtn: "//button[text()='Enroll']",
        toastMeassage: `//section[contains(@class,'lms-success-msg-wrapper')]//h3`,
        enrollStatus: `(//div[contains(@id,'wrapper-enrollment-action')])[2]`,
        enrollORCancel: (data: string) => `//span[text()='${data}']`,
        verifyManageEnrollmentDropdown:`//button[@data-id='enrollment-action']`,
        reaonDesc: `//textarea[@id='check_box_msgsenrollmentviewstatususer']`,
        submitReason: `//button[text()='Submit']`,
        saveStatus: `//button[text()='Save']`,

        //Admin Enrollment:-
        clickModifyEnroll: `//a[text()='View/Modify Enrollment']`,
        completionDateInput: `//div[contains(@id,'check_box')]/input`,

        //Enroll-searchby
        enrollSearchDropdown: `//button[@data-id='training-searchby']`,
        enrollSearchBy: (data: string) => `//span[contains(text(),'Search by ${data}')]`,

        //Admin Enrollments:-
        viewLearner: `//button[text()='View Learner']`,

        //Enrollment by Manager
        selectTeamUser: `(//input[contains(@id,'selectedlearners')]/following::i)[1]`,
        selectTeamUserBtn: `//button[text()='Select']`,
        enrollementSts: (code: string) => `(//span[text()='${code}']//following::button[contains(@data-id,'usr-enrollment-action')])[1]`,
        enrollByCriteriaDropDown: `//label[text()='Enroll By Criteria']//following::button[contains(@data-id,'enroll-group')]`,

        //Class Cancel Reason
        cancelReason: `//textarea[@id='check_box_msgs']`,
        confirmBth: `//button[text()='Confirm']`,
        discardBtn: `//button[text()='Discard']`,

        //max seat over ride popup
        seatMaxPopupMsg: `//div[contains(@class,'information_text')]//span`,
        clickYesBtn: `//button[text()='Yes']`,
        okBtn: "//button[text()='OK']",
        clickEnrollButton: `//a[contains(@class,'btn') and text()='Enroll']`,
        
        //selecting the user for order creation
        selectUserForOrderCreation: (data: string) => `//td[contains(text(),'${data}')]//following::i[contains(@class,'fa-circle icon')][1]`,
        clickCheckoutBtn: `//button[text()='checkout']`,
        clickCalculateTax: `//button[text()='Calculate Tax']`,
        clickCreateAndApproveOrder:`//button[text()='create order & approve']`,
        clickCreateOrderBtn:`//button[text()='Create Order']`,
        selectCourseForOrderCreation:`(//input[contains(@id,'training')]/following::i)[2]`,
        paymentMethodDropdown: `//label[text()='Payment Method']//following::div[@id='wrapper-state']`,
        paymentMethod: (option: string) => `//span[text()='${option}']`,
        orderSuccessMsg: `//section[contains(@class,'lms-success')]//h3`,

        // Load More button
        loadMoreBtn: `//button[text()='Load More']`,

        // TP Enrollment selectors
        enrollToTpBtn: `//span[text()='View Status/Enroll Learner to TP Courses']`,
        searchUserInput: `//input[@placeholder='Search']`,
            searchUserCheckbox:(user:string)=>`(//td[text()='${user}']/following::i)[1]`,
        userSearchCheckbox: (username: string) => `//td[contains(text(),'${username}')]//following::td//label)[1]`,
        selectLearnerBtn: `//button[text()='Select Learner']`,
        tpSearchInput: `(//input[@placeholder='Search'])[2]`,
        tpSearchResult: (tpName: string) => `//td[contains(text(),'${tpName}')]`,
        selectTPRadio: `//input[@type='radio']`,
        tpCourseSearchInput: `//input[@placeholder='Search Course']`,
        tpCourseResult: (courseName: string) => `//td[contains(text(),'${courseName}')]`,
        tpInstanceResult:(data:string)=>`//li[text()='${data}']`,
        enrollmentsTab: `//a[text()='Enrollments']`,




    };


    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
    async clickViewLearner() {
        await this.click(this.selectors.viewLearner, "View Learner", "Button")
    }
    
     //Popup handling when an admin tries to enroll for cancelled/completed class
     async clickOkBtn(){
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.okBtn, 'OK');
        await this.click(this.selectors.okBtn, "OK", "Button")
    }


    //Class cancel reason in course page
    async classCancelReason() {
        await this.type(this.selectors.cancelReason, "Enroll Status", FakerData.getDescription())
        await this.click(this.selectors.confirmBth, "Submit", "button")
        await this.wait("maxWait")
    }

    async selectEnroll() {
        await this.click(this.selectors.manageEnrollement, "Manage Enrollment ", "Dropdown")
        await this.click(this.selectors.enrollType, "Manage Enrollment ", " EnrollLink")

    }

    async selectBycourse(data: string) {
        await this.type(this.selectors.searchcourseOrUser, "Course Name", data)
        const index = await this.page.locator("//div[contains(@id,'lms-scroll-results')]//li").count();
        const randomIndex = Math.floor(Math.random() * index) + 1;
        await this.click(this.selectors.courseListOpt(randomIndex), "Course", "Options")
        await this.click(this.selectors.selectCourse, "Select Course", "Radio button")

    }
    async clickSelectedLearner() {
        await this.click(this.selectors.selectedLearners, "Select Learners", "Button")

    }
    async enterSearchUser(data: string) {
        await this.waitSelector(this.selectors.searchcourseOrUser, "User Name")
        await this.type(this.selectors.searchcourseOrUser, "Course Name", data)
        const index = await this.page.locator("//div[contains(@id,'lms-scroll-results')]//li").count();
        const randomIndex = Math.floor(Math.random() * index) + 1;
        await this.click(this.selectors.userListOpt(randomIndex), "Course", "Options")
        await this.click(this.selectors.selectUser, "Select Course", "Radio button")
    }
    async clickEnrollBtn() {
        await this.click(this.selectors.enrollBtn, "Enroll", "Button")
    }
    async verifytoastMessage() {
        await this.verification(this.selectors.toastMeassage, "Enrollment")
    }
    // async selectEnrollOrCancel(data:string){
    //     await this.click(this.selectors.enrollStatus,"Enroll Status","Dropdown")
    //     await this.click(this.selectors.enrollORCancel(data),"Enroll Status","Option")
    // }

    async enterReasonAndSubmit() {
        await this.type(this.selectors.reaonDesc, "Enroll Status", FakerData.getDescription())
        await this.click(this.selectors.submitReason, "Submit", "button")
        await this.click(this.selectors.saveStatus, "Submit", "button")
    }

    //Admin Enrollment
    async clickModifyEnrollBtn() {
        await this.click(this.selectors.clickModifyEnroll, "View/Modify Enrollment", "Button")
    }

 public async completionDateInAdminEnrollment() {
        await this.keyboardType(this.selectors.completionDateInput, getCurrentDateFormatted())
        await this.page.keyboard.press('Tab');
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.submitReason, "Submit Button");
        await this.click(this.selectors.submitReason, "Submit", "Button");
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.saveButton, 'Save');
        await this.click(this.selectors.saveStatus, "Save", "Button");
        await this.spinnerDisappear();
        await this.wait('mediumWait');
    }

    async selectEnrollOrCancel(data: string) {
        await this.click(this.selectors.enrollStatus, "Enroll Status", "Dropdown")
        //await this.click(this.selectors.enrollORCancel(data).first(),"Enroll Status","Option")
        await this.page.locator(this.selectors.enrollORCancel(data)).first().click({ force: true });
    }
    async selectByOption(data: string) {
        await this.wait("minWait");
        await this.validateElementVisibility(this.selectors.enrollSearchDropdown, 'Search By Dropdown');
        await this.click(this.selectors.enrollSearchDropdown, "Search By Dropdown", "Button");
        await this.validateElementVisibility(this.selectors.enrollSearchBy(data), 'Search By Dropdown');
        await this.click(this.selectors.enrollSearchBy(data), "Search By Dropdown", "Button");
    }
    //Enrollment by manager
    async clickViewLearnerBtn() {
        await this.wait("minWait");
        await this.validateElementVisibility(this.selectors.viewLearner, 'View Learner');
        await this.click(this.selectors.viewLearner, "View Learner", "Button")
    }

    //Enrollment by manager

    async selectTeamUser() {
        await this.validateElementVisibility(this.selectors.selectTeamUser, "Select Team User");
        await this.click(this.selectors.selectTeamUser, "Select Team User", "Radio button")
        await this.validateElementVisibility(this.selectors.selectTeamUserBtn, "Select Team User Button");
        await this.click(this.selectors.selectTeamUserBtn, "Select Team User", "Button")
    }
    //Enrollment by manager

    async changeEnrollmentStatus(code: string, data: string) {
        await this.validateElementVisibility(this.selectors.enrollementSts(code), "View/Update Status");
        await this.click(this.selectors.enrollementSts(code), "View/Update Statusr", "Dropdown")
        await this.page.locator(this.selectors.enrollORCancel(data)).last().click({ force: true });
    }
    //Enrollment by manager

    async enrollByCriteria(data: string, option: string, option2: string) {
        await this.wait("minWait")
        const buttons = await this.page.locator(this.selectors.enrollByCriteriaDropDown)
        const buttonsCount = await buttons.count();
        for (let i = 0; i < buttonsCount; i++) {
            const button = buttons.nth(i);
            if (i === 0) {
                await button.click();
                await this.wait("minWait")
                await this.click(this.selectors.enrollORCancel(data), "Search By Dropdown", "Button");
            } else if (i === 1) {
                await button.click();
                await this.wait("minWait")
                await this.click(this.selectors.enrollORCancel(option), "Search By Dropdown", "Button");
                await this.click(this.selectors.enrollORCancel(option2), "Search By Dropdown", "Button");
            }
        }

    }

      //manage enrollment
    async manageEnrollment(data: string) {
        await this.wait("mediumWait")
        await this.click(this.selectors.manageEnrollement, "Manage Enrollment ", "Dropdown")
        await this.click(this.selectors.enrollORCancel(data), "Manage Enrollment ", " EnrollLink")
    }

     async clickOnManageEnrollment() {
        await this.wait("mediumWait")
        await this.click(this.selectors.manageEnrollement, "Manage Enrollment ", "Dropdown")
    }

      async verifyEnrollmentDropDown(data: string) {
        await this.wait("mediumWait")
       const dropdown= await this.getInnerText(this.selectors.verifyManageEnrollmentDropdown);
       await expect(dropdown).toContain(data); 
    }



    async enterSearchUserForSingleOrder(data: string) {
        await this.type(this.selectors.searchcourseOrUser, "Course Name", data)
        const index = await this.page.locator("//div[contains(@id,'lms-scroll-results')]//li").count();
        const randomIndex = Math.floor(Math.random() * index) + 1;
        await this.click(this.selectors.userListOpt(randomIndex), "Course", "Options")
        await this.click(this.selectors.selectUserForOrderCreation(data), "Select Course", "Radio button")
    }
    async clickCheckoutButton() {
        await this.wait("minWait")
        await this.click(this.selectors.clickCheckoutBtn, "Checkout", "button")
        await this.wait("minWait")
        await this.click(this.selectors.clickYesBtn, "Select domain", "button")
        await this.spinnerDisappear();
    }
    async clickCalculateTaxButton() {
        await this.wait("minWait")
        await this.click(this.selectors.clickCalculateTax, "Calculate Tax", "button")
        await this.spinnerDisappear();
    }
    async clickApproveOrder(){
        await this.wait("minWait")
        await this.click(this.selectors.clickCreateAndApproveOrder, "Approve Order", "button")
        await this.spinnerDisappear();
    }
    async selectMulticourseForSingleOrder(data: string) {
        await this.wait("minWait")
        await this.typeAndEnter(this.selectors.searchcourseOrUser, "Course Name", data)
        await this.click(this.selectors.selectCourseForOrderCreation, "Select Course", "Check box")
    }
    public async paymentMethod(payMode: string) {
        await this.validateElementVisibility(this.selectors.paymentMethodDropdown, "Payment method Dropdown")
        await this.click(this.selectors.paymentMethodDropdown, "Payment method", "Dropdown")
        await this.click(this.selectors.paymentMethod(payMode), "Payment Mode", "Option")
    }
    public async orderSuccessMsg() {
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.orderSuccessMsg, "The order has been placed successfully")
        await this.verification(this.selectors.orderSuccessMsg, "The order has been placed successfully")
    }
    async clickCreateOrder(){
        await this.wait("minWait")
        await this.click(this.selectors.clickCreateOrderBtn, "Create Order", "button")
        await this.spinnerDisappear();
    }

    //Max seat override
    async verifyMaxSeatOverRidePopup() {
        await this.wait('mediumWait');
        await this.verification(this.selectors.seatMaxPopupMsg, "You have exceeded the maximum seat for this training")
        await this.click(this.selectors.clickYesBtn, "Yes", "Button")
    }
    async verifyMaxSeatPopup() {
        await this.wait('mediumWait');
        await this.verification(this.selectors.seatMaxPopupMsg, "was not successful")
        await this.click(this.selectors.okBtn, "Ok", "Button")
    }
    async clickEnrollButton() {
        await this.validateElementVisibility(this.selectors.clickEnrollButton, "Enroll Button");
        await this.click(this.selectors.clickEnrollButton, "Enroll Button", "Button")
    }

       async verifyNoResultFound(data:string) {
        await this.typeAndEnter(this.selectors.searchcourseOrUser,"name",data)
        await this.validateElementVisibility(this.selectors.noResultFound,"noResultFound")
    }

    // TP Enrollment methods
    async clickEnrollToTp() {
        await this.wait("minWait");
        await this.waitSelector(this.selectors.enrollDropdown, "Enroll Dropdown")
        await this.click(this.selectors.enrollDropdown, "Enroll Dropdown", "Button")
        await this.click(this.selectors.enrollToTpBtn, "Enroll To TP", "Button");
    }

    public async searchUser(user:string) {
        await this.wait("maxWait");
       await this.typeAndEnter("(//input[@placeholder='Search'])[1]", "User", user);
    }

     public async clickSearchUserCheckbox(user:string) {
        await this.waitSelector(this.selectors.searchUserCheckbox(user), "searchUserCheckbox" )
        await this.click(this.selectors.searchUserCheckbox(user), "searchUser", "chkbox")
    }

       public async clickSelectLearner() {
  await this.wait("maxWait");

  const selectUserLocator = this.page.getByRole('button', { name: 'Select' });
  await selectUserLocator.scrollIntoViewIfNeeded();
  await selectUserLocator.waitFor({ state: "visible" });
  await expect(selectUserLocator).toBeEnabled();
  await selectUserLocator.click();
}

    
      public async searchandSelectTP(TP:string) {
        await this.wait("maxWait");
     
        await this.click("//div[@id='learning-path-selection-filter-icon']", "searchbar", "Button")
        await this.type(this.selectors.searchCourse, "SearchTp", TP)
        await this.click(`//span[text()='${TP}']`, "SelectTp", "Link"
        )
    }

    public async selectCls() {
        await this.wait("maxWait");
  const selectLocator =  this.page.locator("(//div[contains(@class,'field_title')]//preceding::i[contains(@class,'lms-chevron-up-down')][1])");
  await selectLocator.scrollIntoViewIfNeeded();
  await selectLocator.waitFor({ state: "visible" });
  await expect(selectLocator).toBeEnabled();
  await selectLocator.click();
 
       

    }

         public async searchTPCourse(user:string) {
        await this.wait("maxWait");
        await this.page.locator("(//input[@placeholder='Search'])[2]").scrollIntoViewIfNeeded();
       await this.type("(//input[@placeholder='Search'])[2]", "User", user);
       await this.click(this.selectors.tpInstanceResult(user), "select course", "Link")
       //await this.click("(//label[contains(@for,'selectedinstance')])[1]", "dropdown", "Button")
    }

   

    async clickEnrollments() {
        await this.click(this.selectors.enrollmentsTab, "Enrollments", "Tab");
    }

    // Load More button functionality
    async isLoadMoreButtonVisible(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.selectors.loadMoreBtn, { timeout: 5000 });
            return await this.page.isVisible(this.selectors.loadMoreBtn);
        } catch (error) {
            return false;
        }
    }

    async isLoadMoreButtonEnabled(): Promise<boolean> {
        const isVisible = await this.isLoadMoreButtonVisible();
        if (!isVisible) return false;
        
        return await this.page.isEnabled(this.selectors.loadMoreBtn);
    }

    async clickLoadMoreButton() {
        const isEnabled = await this.isLoadMoreButtonEnabled();
        if (isEnabled) {
            await this.click(this.selectors.loadMoreBtn, "Load More", "Button");
            await this.wait("mediumWait");
        } else {
            throw new Error("Load More button is not visible or enabled");
        }
    }

    async verifyLoadMoreButtonAndClick() {
        console.log("Checking Load More button visibility and functionality...");
        
        const isVisible = await this.isLoadMoreButtonVisible();
        console.log(`Load More button visible: ${isVisible}`);
        
        if (isVisible) {
            await this.page.locator(this.selectors.loadMoreBtn).scrollIntoViewIfNeeded();
            const isEnabled = await this.isLoadMoreButtonEnabled();
            console.log(`Load More button enabled: ${isEnabled}`);
            
            // Assert that the button is visible and enabled
            await expect(this.page.locator(this.selectors.loadMoreBtn)).toBeVisible();
            await expect(this.page.locator(this.selectors.loadMoreBtn)).toBeEnabled();
            
            console.log("Load More button assertions passed - visible and enabled");
            
             
            await this.clickLoadMoreButton();
            console.log("Load More button clicked successfully");
            
            return true;
        } else {
            console.log("Load More button is not visible - no action taken");
            return false;
        }
    }
 //Enrollment segmentation
    async verifyEnrollmentSegmentation(otherUser: string) {
        await this.wait("minWait")
        await this.typeAndEnter(this.selectors.searchcourseOrUser, "Course Name", otherUser)
        const element = this.page.locator(this.selectors.selectUser(otherUser));
        const count = await element.count();
        if (count === 0) {
            console.log("Enrollment Segmentation is working correctly");
        }
    }






}    