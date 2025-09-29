import { environmentSetup } from "../../playwright.config";
export let filePath: any;
switch (environmentSetup) {
    case "qa":
        filePath = {
            tags: "../data/MetadataLibraryData/QA/tags.json",
            ceuData: "../data/MetadataLibraryData/QA/ceuData.json",
            ceuProvider : "../data/MetadataLibraryData/QA/ceuProvider.json",
            department : "../data/MetadataLibraryData/QA/department.json",
            empType : "../data/MetadataLibraryData/QA/empType.json",
            jobRole : "../data/MetadataLibraryData/QA/jobRole.json",
            jobTitle : "../data/MetadataLibraryData/QA/jobTitle.json",
            userType : "../data/MetadataLibraryData/QA/userType.json",
            catagory: "../data/MetadataLibraryData/QA/catagory.json",
            location: "../data/MetadataLibraryData/QA/location.json",
        }
        break;
    case "dev":
        filePath = {
            tags: "../data/MetadataLibraryData/Dev/tags.json",
            ceuData: "../data/MetadataLibraryData/Dev/ceuData.json",
            ceuProvider : "../data/MetadataLibraryData/Dev/ceuProvider.json",
            department : "../data/MetadataLibraryData/Dev/department.json",
            empType : "../data/MetadataLibraryData/Dev/empType.json",
            jobRole : "../data/MetadataLibraryData/Dev/jobRole.json",
            jobTitle : "../data/MetadataLibraryData/Dev/jobTitle.json",
            userType : "../data/MetadataLibraryData/Dev/userType.json",
            catagory: "../data/MetadataLibraryData/Dev/catagory.json",
            location: "../data/MetadataLibraryData/Dev/location.json",
        }
        break;
    case "automation":
        filePath = {
            tags: "../data/MetadataLibraryData/Automation/tags.json",
            ceuData: "../data/MetadataLibraryData/Automation/ceuData.json",
            ceuProvider : "../data/MetadataLibraryData/Automation/ceuProvider.json",
            department : "../data/MetadataLibraryData/Automation/department.json",
            empType : "../data/MetadataLibraryData/Automation/empType.json",
            jobRole : "../data/MetadataLibraryData/Automation/jobRole.json",
            jobTitle : "../data/MetadataLibraryData/Automation/jobTitle.json",
            userType : "../data/MetadataLibraryData/Automation/userType.json",
            catagory: "../data/MetadataLibraryData/Automation/catagory.json",
            location: "../data/MetadataLibraryData/Automation/location.json",
        }
        break;
    case "qaProduction":
        filePath = {
            tags: "../data/MetadataLibraryData/Production/tags.json",
            ceuData: "../data/MetadataLibraryData/Production/ceuData.json",
            ceuProvider : "../data/MetadataLibraryData/Production/ceuProvider.json",
            department : "../data/MetadataLibraryData/Production/department.json",
            empType : "../data/MetadataLibraryData/Production/empType.json",
            jobRole : "../data/MetadataLibraryData/Production/jobRole.json",
            jobTitle : "../data/MetadataLibraryData/Production/jobTitle.json",
            userType : "../data/MetadataLibraryData/Production/userType.json",
            catagory: "../data/MetadataLibraryData/Production/catagory.json",
            location: "../data/MetadataLibraryData/Production/location.json",
        }
        break;
    default:
        throw new Error(`Invalid environment setup: ${environmentSetup}`);
}
