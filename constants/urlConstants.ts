import { environmentSetup } from "../playwright.config";
export let URLConstants: any
//export let URLConstants
switch (environmentSetup) {
    case "automation":
        URLConstants = {
            adminURL: "https://lms.expertusonedev.com/backdoor",
            leanerURL: "https://lms.expertusonedev.com/learner/unitedrentalsstage/",   
            learnerportal: "https://lms.expertusonedev.com/learner/portal1/",
            learnerportal2: "https://lms.expertusonedev.com/learner/portal2/",
            portal1: "UnitedRentalsStage",
            portal2: "portal1",
            portal3: "portal2",
            LearnerGroup1: "ACCI",
            LearnerGroup2: "Test LG",
            creditCardNumber: "4111111111111111",
            cardExpiryDate: "10/27",
            cVV: "111",
            USPS_Client_Id:"ScI6WsAHlUa6YC27zLRbQ0otldGLFdGG",
            USPS_Client_Secret:"AG0WP7HYj4a00VXh",
            USPS_API_URL:"https://api-cat.usps.com/",
            EasyPost_API_Key:"EZTK507eedb9b0d14160837c7513d7462d84YnEE9NZqer80LS1xPq0irg",
        }
        break;
    case "qa":
        URLConstants = {
            adminURL: "https://qa.expertusoneqa.com/backdoor",
            leanerURL: "https://qa.expertusoneqa.com/learner/qa/",
            learnerportal: "https://qa.expertusoneqa.com/learner/qaagleenew/",
            learnerportal2: "https://qa.expertusoneqa.com/learner/portal8/",
            portal1: "qa",
            portal2: "qaagleenew",
            portal3: "portal8",
            LearnerGroup1: "New Auto LG1_42",
            LearnerGroup2: "New Auto LG2_42",
            creditCardNumber: "4111111111111111",
            cardExpiryDate: "10/27",
            cVV: "111",
            USPS_Client_Id:"ScI6WsAHlUa6YC27zLRbQ0otldGLFdGG",
            USPS_Client_Secret:"AG0WP7HYj4a00VXh",
            USPS_API_URL:"https://api-cat.usps.com/",
            EasyPost_API_Key:"EZTK507eedb9b0d14160837c7513d7462d84YnEE9NZqer80LS1xPq0irg",
        }
        break;
    case "qaProduction":
        URLConstants = {
            adminURL: "https://qaautomation.expertusoneqa.cloud/backdoor",
            leanerURL: "https://qaautomation.expertusoneqa.cloud/learner/qaautomation/",
            learnerportal: "https://qaautomation.expertusoneqa.cloud/learner/autoportal/",
            learnerportal2: "https://qaautomation.expertusoneqa.cloud/learner/autoportal1/",
            portal1: "qaautomation",
            portal2: "autoportal",
            portal3: "autoportal1",
            LearnerGroup1: "AutoLG1(Do not Use)",
            LearnerGroup2: "AutoLG2(Do not Use)",
            creditCardNumber: "4111111111111111",
            cardExpiryDate: "10/27",
            cVV: "111",
            USPS_Client_Id:"ScI6WsAHlUa6YC27zLRbQ0otldGLFdGG",
            USPS_Client_Secret:"AG0WP7HYj4a00VXh",
            USPS_API_URL:"https://api-cat.usps.com/",
            EasyPost_API_Key:"EZTK507eedb9b0d14160837c7513d7462d84YnEE9NZqer80LS1xPq0irg"
        }
        break;
        case "dev":
            URLConstants = {
                adminURL: "https://urpreprod.expertusone.cloud/backdoor",
                leanerURL: "https://urpreprod.expertusone.cloud/learner/unitedrentalspreprod/",
                learnerportal: "https://lms.expertusonedev.com/learner/portal1",
                learnerportal2: "https://lms.expertusonedev.com/learner/portal2",
                portal1: "UnitedRentalsPreprod",
                portal2: "portal1",
                portal3: "portal2",
                LearnerGroup1: "AutoLG1(Do not Use)",
                LearnerGroup2: "AutoLG2(Do not Use)",
                creditCardNumber: "4111111111111111",
                cardExpiryDate: "10/27",
                cVV: "111",
                USPS_Client_Id:"ScI6WsAHlUa6YC27zLRbQ0otldGLFdGG",
            USPS_Client_Secret:"AG0WP7HYj4a00VXh",
            USPS_API_URL:"https://api-cat.usps.com/",
            EasyPost_API_Key:"EZTK507eedb9b0d14160837c7513d7462d84YnEE9NZqer80LS1xPq0irg",
            }
            break;
}