import { URLConstants } from "../constants/urlConstants";
import { filePath } from "../data/MetadataLibraryData/filePathEnv";
import { FakerData, getCurrentDateFormatted, gettomorrowDateFormatted } from "../utils/fakerUtils";
import { getRandomItemFromFile } from "../utils/jsonDataHandler";
import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Page, expect } from "@playwright/test";

export class UserPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        createUserbtn: `//button[text()='CREATE USER']`,
        createUserLabel: "//h1[text()='Create User']",
        editUserLabel: "//h1[text()='Edit User']",
        inputField: (name: string) => `//input[@id="${name}"]`,
        addressInput: (label: string) => `(//label[contains(text(),'${label}')]/following::input[contains(@id,'user-add')])[1]`,
        dropdownToggle: (label: string) => `(//label[text()='${label}']/following::button[@data-bs-toggle='dropdown'])[1]`,
        dropdownSearchInput: "//footer//following::input[@type='search']",
        dropdownOption: (data: string) => `//span[text()='${data}']`,
        saveButton: "//button[text()='Save']",
        proceedButton: (name: string) => `//footer//following::button[contains(text(),'${name}')]`,
        searchField: "//input[@id='exp-search-field']",
        rolesBtn: "//input[@id='user-roles-filter-field']",
        rolesList: (roles: string) => `//li[text()='${roles}']`,
        editIcon: "(//span[contains(@class,'justify-content-start') and  @aria-label='Edit User'])[1]",
        userProfileUploadInput: "//input[@id='upload-usr-pic-file']",
        updateButton: "//button[text()='Update']",
        successMessage: "//div[@id='addedit-user-form-container']//h3[contains(text(),'successfully')]",
        employmentTypeInput: "//label[text()='employment type']//parent::div//input",
        commonOptionBtn: (value: string, data: string) => `(//div[@id='user-${value}-filter-lms-scroll-results']//li)[1]`,
        departmentType: `//label[text()='department']/following::div[@id='user-department']//input`,
        timeZone: `(//div[@id='wrapper-user-timezone']//button)[1]`,
        timeZoneSearch: `//footer/following-sibling::div//input`,
        selectlocationtz: (index: number, timeZone: string) => `(//li/a/span[contains(text(),'${timeZone}')])[${index}]`,
        hireDate: `//input[@id='user-hiredate-input']`,
        userType: `//input[@id='user-usertype-filter-field']`,
        jobtitle: `//input[@id='user-jobtitle-filter-field']`,
        manager: `//input[@id='user-manager-filter-field']`,
        othermanager: `//input[@id='user-other-managers-filter-field']`,
        searchOtherManager: `//input[@id='user-other-managers']`,
        otherMgrOption: (index: number) => `(//div[@id='user-other-managers']/following::li)[${index}]`,
        specificManager: (managerName: string) => `//div[contains(text(),'${managerName}')]`,
        language: `//label[contains(text(),'Language')]/following::div[@id='wrapper-user-language']`,
        searchLanguage: `//footer/following::div/input`,
        courseLanguageLink: (language: string) => `//label[text()='Language']//following::span[text()='${language}']`,
        editButton: `//a[text()='Edit User']`,
        deleteUser: `(//a[@aria-label="Delete"]/i)[1]`,
        confirmDeleteoption: `//button[text()='Delete']`,
        verifyDeletemsg: `//div[@id='lms-overall-container']//h3`,
        organizationTypeDD: `(//label[text()='Organization type']/parent::div//button)[1]`,
        organizationType: (type: string) => `//span[text()='${type}']`,
        closeIcon: "//i[contains(@class,'xmark')]",
        managerclosePopup: "//span[contains(text(),'Are you sure you want to continue?')]",
        yesBtn: "//button[text()='Yes']",
        suspendBtn: "//button[text()='Suspend']",
        suspendDialog: "//span[contains(text(),'Are you sure you want to suspend the user')]",
        suspendDialogBtn: "//span[contains(text(),'Are you sure you want to suspend the user')]//following::button[text()='Suspend']",
        deleteIcon: "a[aria-label='Delete'] , a[title='Delete'] i",
        deleteDialog: "//span[contains(text(),'Are you sure you want to delete the user')]",
        deleteBtn: "//button[text()='Delete']",
        noResultText: "//h3[contains(text(),'There are no results that match your current filters')]",
        activateUserIcon: "a[title='Activate'], a[aria-label='Activate'] i",
        activateDialog: "//span[contains(text(),'Are you sure you want to activate the user')]",
        activateBtn: "//button[text()='Activate']",
        impersonationIcon: " a[aria-label='Impersonation'] , a[title='Impersonation'] i",
        impersonateLabel: "//label[text()='Select Domain you want to Impersonate']",
        impersonateOptionDD: "(//label[text()='Select Domain you want to Impersonate']//parent::div//button)[1]",
        impersonateDomainValue: (option: string) => `//footer//following::a/span[text()='${option}']`,
        reasonInput: "//label[text()='Reason']//parent::div//textarea",
        impersonateProceedBtn: "//button[text()='Proceed']",
        okBtn: "//button[text()='OK']",
        logOutBtn: "//div[@class='logout']//a",
        //Internal
        validateUser: (data: string) => `//div[text()='${data}']`,
        //UserPage Enrollment icon
        enrollmentIcon: "(//a[@aria-label='Enrollments'])[1]",
        enrollmentLabel: "//h1[text()='Manage Enrollments']",
        enrollmentStatus: "//div[contains(@class,'row row-cols-md-')]//span",
        viewEnrollmentStsIcon: "//i[@aria-label='View all the status']",

        //For Suspended User success message
        sso_negativemsg: "//span[@id='error-txt']",

        //For user address validation
        verifyUserAddress: `//button[text()='Click to verify address']`,
        addressVerificationMessage: `//button[text()='Click to verify address']//following-sibling::span`,

        //End impersonation
        endImpersonation: "//span[text()='End Impersonation']",

        //for contact support email
        customerAdminUserFromDropdown: `//li[contains(text(),'Arivazhagan P (arivazhaganp)')]`,
        checkContactSupport: `//input[@id='course-contact-support']`,

        //address inheritance
        inheritAddressLabel: "//span[text()='Inherit Address From']",
        inheritAddressCheckbox: "(//span[text()='Inherit Address From']//preceding-sibling::i)[1]",

        //emergency contact inheritance
        inheritEmergencyContactLabel: "//span[text()='Inherit']",
        inheritEmergencyContactCheckbox: "(//span[text()='Inherit']//preceding-sibling::i)[1]",

        //auto generate username
        autoGenerateUsernameLabel: "//span[text()='Auto-Generate']",
        autoGenerateUsernameCheckbox: "(//span[text()='Auto-Generate']//preceding-sibling::i)[1]",

          //enter org name
        orgName: `#user-organization-filter-field`,
        orgNameList: (name: string) => `//li[text()='${name}']`,
        userNameOnListingPage: (name: string) => `//div[text()='${name}']`,
        userNotFoundMessage:`//h3[contains(text(),'There are no results that match your current filters. Try removing some of them to get better results')]`,

    }

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
    async verifySuspendUserMessage() {
        await this.verification(this.selectors.sso_negativemsg, "User ID is inactive. Please contact the admin.");
    }
    async verifyCreateUserLabel() {
        await this.verification(this.selectors.createUserLabel, "CREATE USER");
    }

    async verifyEditUserLabel() {
        await this.verification(this.selectors.editUserLabel, "Edit User");
    }


    async clickCreateUser() {
        await this.wait("minWait");
        await this.validateElementVisibility(this.selectors.createUserbtn, "CreateButton")
        await this.click(this.selectors.createUserbtn, "Create User", "Button");
    }


    async enter(name: string, data: string) {
        const selector = this.selectors.inputField(name);
        await this.type(selector, name, data);
    }

    async typeAddress(label: string, data: string) {
        const selector = this.selectors.addressInput(label);
        await this.type(selector, "Address", data);
    }

    async select(label: string, data: string) {
        const toggleSelector = this.selectors.dropdownToggle(label);
        await this.click(toggleSelector, label, 'Dropdown');
        await this.wait("minWait")
        console.log("The country is:" + data)
        await this.type(this.selectors.dropdownSearchInput, label, data);
        const optionSelector = this.selectors.dropdownOption(data);
        await this.click(optionSelector, data, 'DropDown');
        await this.verification(toggleSelector, data);
    }

    async selectEmploymentType(empType: string) {
        let data = getRandomItemFromFile(filePath.empType);
        await this.type(this.selectors.employmentTypeInput, "Employment Type", data)
        await this.mouseHover(this.selectors.commonOptionBtn(empType, data), data);
        await this.click(this.selectors.commonOptionBtn(empType, data), data, "List");
        return data;
    }
    async selectDepartmentType(dpmtType: string) {
        let data = getRandomItemFromFile(filePath.department);
        await this.typeAndEnter(this.selectors.departmentType, "Department Type", data)
        await this.mouseHover(this.selectors.commonOptionBtn(dpmtType, data), data);
        await this.click(this.selectors.commonOptionBtn(dpmtType, data), data, "List");
    }

    async organizationType(data: string) {
        await this.click(this.selectors.organizationTypeDD, "Organization Type", "DropDown");
        await this.click(this.selectors.organizationType(data), "Organization Type", "List");
    }

    async selectUserType(userType: string) {
        let data = getRandomItemFromFile(filePath.userType);
        await this.typeAndEnter(this.selectors.userType, "User Type", data)
        await this.mouseHover(this.selectors.commonOptionBtn(userType, data), data);
        await this.click(this.selectors.commonOptionBtn(userType, data), data, "List");
    }
    async selectManager(data: string) {
        //  let data = getRandomItemFromFile("../data/peopleDirectManager.json");
        await this.typeAndEnter(this.selectors.manager, "User Type", data);
        await this.wait('minWait');
        let manager = ("div[id^='user-manager-filter'] li");
        await this.wait('minWait');
        await this.click(manager, "manager", "Dropdown")
    }

    async selectOtherManager() {
        //  let data =getRandomItemFromFile("../data/peopleOtherManager.json");
        await this.click(this.selectors.othermanager, "OtherManager", "input field")
        //    await this.typeAndEnter(this.selectors.searchOtherManager,"OtherManagers",data)
        const count = await this.page.locator("//div[@id='user-other-managers']/following::li").count();
        const randomIndex = Math.floor(Math.random() * count) + 1;
        await this.mouseHover(this.selectors.otherMgrOption(randomIndex), "OtherManager");
        await this.click(this.selectors.otherMgrOption(randomIndex), "OtherManager", "List");
    }

    async selectSpecificManager(data: string) {
        //  let data =getRandomItemFromFile("../data/peopleOtherManager.json");
        await this.click(this.selectors.othermanager, "OtherManager", "input field")
        await this.typeAndEnter(this.selectors.searchOtherManager, "OtherManagers", data)
        // const count = await this.page.locator("//div[@id='user-other-managers']/following::li").count();
        // const randomIndex = Math.floor(Math.random() * count) + 1;
        /* await this.mouseHover(this.selectors.specificManager(data), "OtherManager");
        await this.click(this.selectors.specificManager(data), "OtherManager", "List"); */
        let manager = ("div[id^='user-other-managersresu'] li");
        await this.wait('minWait');
        await this.click(manager, "manager", "Dropdown")
    }

    async removeUserRole() {
        await this.click(this.selectors.rolesBtn, "Roles", "Button");
    }

    async selectLanguage(language: string) {
        await this.page.locator(this.selectors.language).scrollIntoViewIfNeeded();
        await this.click(this.selectors.language, "Language", "Field");
        await this.type(this.selectors.searchLanguage, "Input Field", language);
        await this.mouseHover(this.selectors.courseLanguageLink(language), language);
        await this.click(this.selectors.courseLanguageLink(language), language, "Button");

    }

    async selectjobTitle(jobTitle: string) {
        let data = getRandomItemFromFile(filePath.jobTitle);
        await this.typeAndEnter(this.selectors.jobtitle, "User Type", data)
        await this.mouseHover(this.selectors.commonOptionBtn(jobTitle, data), data);
        await this.click(this.selectors.commonOptionBtn(jobTitle, data), data, "List");
    }


    async clickSave() {
        await this.validateElementVisibility(this.selectors.saveButton, 'Save');
        await this.click(this.selectors.saveButton, "Save", "Button");
    }

    async clickProceed(name: string) {
        const buttonSelector = this.selectors.proceedButton(name);
        await this.validateElementVisibility(buttonSelector, name);
        await this.click(buttonSelector, name, "Button");
    }

    async userSearchField(data: string) {
        await this.type(this.selectors.searchField, "Search Field", data);
        await this.keyboardAction(this.selectors.searchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
    }

    async clickRolesButton(roles: string) {
        await this.click(this.selectors.rolesBtn, "Roles", "Button");
        await this.click(this.selectors.rolesList(roles), roles, "Button");
        await this.click(this.selectors.rolesBtn, "Roles", "Button");
    }

    async editIcon() {
        await this.click(this.selectors.editIcon, "Edit Icon", "Button");
        await this.spinnerDisappear();
    }

    async userProfileUpload() {
        const filePath = "../data/Profilepic.jpg";
        await this.mouseHover(this.selectors.userProfileUploadInput, "Upload");
        await this.uploadFile(this.selectors.userProfileUploadInput, filePath);
    }

    async updateUser() {
        await this.validateElementVisibility(this.selectors.updateButton, "Update");
        await this.wait('minWait');
        await this.click(this.selectors.updateButton, "Update", "Button");
        await this.wait('minWait');
    }



    async verifyUserCreationSuccessMessage() {
        await this.verification(this.selectors.successMessage, "successfully");
    }


    async verifyUserdeleteSuccessMessage() {
        await this.verification(this.selectors.verifyDeletemsg, "no results");
    }

    async selectTimeZone(data: string, timeStd: string) {
        await this.validateElementVisibility(this.selectors.timeZone, "TimeZone");
        await this.click(this.selectors.timeZone, "TimeZone", "Input");
        await this.keyboardType(this.selectors.timeZoneSearch, data,);
        const index = await this.page.locator(`//li/a/span[contains(text(),'${timeStd}')]`).count();
        const randomIndex = Math.floor(Math.random() * index) + 1;
        await this.mouseHover(this.selectors.selectlocationtz(randomIndex, timeStd), "TimeZone");
        await this.click(this.selectors.selectlocationtz(randomIndex, timeStd), "TimeZone", "Option");

    }

    public async enterHireDate() {
        await this.keyboardType(this.selectors.hireDate, gettomorrowDateFormatted());
    }

    public async editbtn() {
        await this.click(this.selectors.editButton, "Edit Course", "Button");
    }

    public async clickdeleteIcon() {
        await this.click(this.selectors.deleteUser, "Delete Course", "Icon");
        await this.click(this.selectors.confirmDeleteoption, "Delete", "Button");
    }

    public async clickSuspendButton() {
        await this.validateElementVisibility(this.selectors.suspendBtn, "Suspend");
        await this.wait('minWait');
        await this.page.keyboard.press('PageDown');
        await this.click(this.selectors.suspendBtn, "Suspend", "Button");
        await this.wait('mediumWait');
        let dialog = this.page.locator(this.selectors.suspendDialog);
        if (await dialog.isVisible()) {
            let text = await dialog.innerText();
            console.log(text);
            await this.click(this.selectors.suspendDialogBtn, "Suspend", "Button")
        }

    }

    public async clickDeleteIcon() {
        await this.validateElementVisibility(this.selectors.deleteIcon, "Delete Icon");
        await this.mouseHover(this.selectors.deleteIcon, "Delete Icon");
        await this.wait('mediumWait');
        await this.click(this.selectors.deleteIcon, "Delete Icon", "Delete");
        await this.wait('mediumWait');
        let dialog = this.page.locator(this.selectors.deleteDialog);
        if (await dialog.isVisible()) {
            let text = await dialog.innerText();
            console.log(text);
            await this.click(this.selectors.deleteBtn, "Suspend", "Button")
        }
    }

    public async verifyDeletedUser() {
        await this.validateElementVisibility(this.selectors.noResultText, "No Result");
        await this.verification(this.selectors.noResultText, "There are no results that match your current filters");
    }

    public async clickActivateIcon() {
        await this.validateElementVisibility(this.selectors.activateUserIcon, "Delete Icon");
        await this.mouseHover(this.selectors.activateUserIcon, "Delete Icon");
        await this.wait('mediumWait');
        await this.click(this.selectors.activateUserIcon, "Delete Icon", "Delete");
        await this.wait('mediumWait');
        let dialog = this.page.locator(this.selectors.activateDialog);
        if (await dialog.isVisible()) {
            let text = await dialog.innerText();
            console.log(text);
            await this.click(this.selectors.activateBtn, "Suspend", "Button")
        }
    }

    public async clickImpersonationIcon() {
        await this.validateElementVisibility(this.selectors.impersonationIcon, "Delete Icon");
        await this.mouseHover(this.selectors.impersonationIcon, "Delete Icon");
        await this.wait('mediumWait');
        await this.click(this.selectors.impersonationIcon, "Delete Icon", "Delete");
        await this.wait('mediumWait');

    }

    public async fillImpersonateForm() {
      //  let option = URLConstants.portal1
        await this.validateElementVisibility(this.selectors.impersonateLabel, "Impersonate Label");
      //  await this.click(this.selectors.impersonateOptionDD, "Select Domain you want ?", "Drop Down");
      //  await this.click(this.selectors.impersonateDomainValue(option), "Select Domain you want ?", "Option");
        await this.type(this.selectors.reasonInput, "Reason", FakerData.getDescription());
        await this.click(this.selectors.impersonateProceedBtn, "Proceed", "Button");
        await this.wait('mediumWait');
        await this.click(this.selectors.okBtn, "OK", "Button");

    }

    public async clickLogOutButton() {
        await this.mouseHover(this.selectors.logOutBtn, "Log Out");
        await this.click(this.selectors.logOutBtn, "Log Out", "Icon");
    }
    public async userValidate(uname: string) {
        await this.verification(this.selectors.validateUser(uname), uname)
    }


    //Manage Enrollments Label:-

    async verifyEnrollmentLabel() {
        await this.verification(this.selectors.enrollmentLabel, "Manage Enrollments");
    }

    //Particular user getEnrollmentStatus:-

    async getEnrollmentStatus() {
        const elements = await this.page.$$(this.selectors.enrollmentStatus)
        const texts: string[] = [];
        for (const el of elements) {
            const text = await el.textContent();
            texts.push(text || '');
        }
        console.log("Enrollment Status:-")
        for (let i = 0; i < texts.length; i += 3) {
            if (texts[i] && texts[i + 2]) {
                console.log(`${texts[i]} : ${texts[i + 2]}`);
            }
        }
    }

    //Click Enrollment icon from the user page->Enrollment-Status Icon:-	
    async clickViewEnrollmentStsIcon() {
        await this.click(this.selectors.viewEnrollmentStsIcon, "View Enrollment Status Icon", "Button");
        await this.wait("minWait")
    }

    //Click Enrollment icon from the user page:-
    async clickEnrollmentIcon() {
        await this.click(this.selectors.enrollmentIcon, "Enrollment Icon", "Button");
        await this.spinnerDisappear();
    }

    //For User address validation

    async clickVerifyAddressBtn() {
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.verifyUserAddress, "Click to verify address")
        await this.click(this.selectors.verifyUserAddress, "Click to verify address", "Button");
    }

    async verifyUserAddress() {
        await this.wait("minWait")
        let message = await this.getInnerText(this.selectors.addressVerificationMessage);
        if (message == "Address Verified") {
            expect(message).toContain('Address Verified')
            console.log("Given Address has been verified")
        } else {
            expect(message).toContain('Invalid Address')
            console.log("Given Address is Invalid")
        }
    }

    //End Impersonation
    async clickendImpersonation() {
        await this.click(this.selectors.endImpersonation, "End Impersonation", "Link")
        await this.wait("minWait");
    }

    //For contact support email

    async typeAndSelectIUser(data: string) {
        await this.wait("minWait")
        await this.type(this.selectors.searchField, "search", data);
        await this.validateElementVisibility(this.selectors.customerAdminUserFromDropdown, "dropdown")
        await this.click(this.selectors.customerAdminUserFromDropdown, "admin", "dropdown");
        await this.click(this.selectors.editIcon, "customeradmin", "edit");
    }
    public async uncheckInheritAddressIfPresent() {
        const classValue = await this.page.locator('#user-addr1').getAttribute('class');

        // Check if it contains a specific class
        if (classValue && classValue.includes('form_field_deactived')) {
            await this.click("//span[text()='Inherit Address From']", "Inherit Address From Checkbox", "Checkbox");
        } else {
            console.log("Inherit Address already unchecked")
            //address inheritance
        }
    }
    //emergency contact inheritance
    public async uncheckInheritEmergencyContactIfPresent() {
         const classValue = await this.page.locator('#emrg-cont-name').getAttribute('class');

        // Check if it contains a specific class
        if (classValue && classValue.includes('form_field_deactived')) {
            await this.click("//span[text()='Inherit']", "Inherit Address From Checkbox", "Checkbox");
        } else {
            console.log("Inherit emergency already unchecked")
            //address inheritance
        }
    }

    //auto generate username
    public async uncheckAutoGenerateUsernameIfPresent() {
          const classValue = await this.page.locator('#username').getAttribute('class');

        // Check if it contains a specific class
        if (classValue && classValue.includes('form_field_deactived')) {
            await this.click("//span[text()='Auto-Generate']", "Auto-Generate Username Checkbox", "Checkbox");
        } else {
            console.log("auto generation already unchecked")
        
        }
}

 async enrterOrgName(orgNameData: string) {
        await this.wait("minWait")
        await this.typeAndEnter(this.selectors.orgName, "Organization Name", orgNameData);
        await this.click(this.selectors.orgNameList(orgNameData), "Organization Name", "List")
    }

    async verifyUserSegmentation(user:string,otherUser:string) {
            await this.verification(this.selectors.userNameOnListingPage(user),user); 
            await this.typeAndEnter(this.selectors.searchField, "Search Field", otherUser);
            const message = await this.getInnerText(this.selectors.userNotFoundMessage);
            expect(message).toContain('There are no results that match your current filters');
            console.log("User Segmentation is working correctly");
    }



}

