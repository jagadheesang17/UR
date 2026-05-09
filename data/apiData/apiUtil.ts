import { environmentSetup } from '../../playwright.config';
export let URLConstants: any
export let credentials: any
switch (environmentSetup) {

    case "qa":
        URLConstants = {
            adminEndPointUrl: "https://qa.expertusoneqa.com/api/v2/admin/rest",
            learnerEndPointUrl: "https://qa.expertusoneqa.com/api/v2/learner/rest"
        }
        credentials = {
            data: {
              //  id: "cbd3c1f9-b4f7-49b3-8436-e45ab428bdb0",
              id: "b3727c29-6bbc-4bc3-8276-8b232ec70222",
                client_id: "38f78440b5e4693f47361d3e5c0c80b9",
                client_secret: "ec7905d0fc328980352675c79fceaa66"
            }

        }

        break;
    case "automation":
        URLConstants = {
            adminEndPointUrl: "https://automation.expertusoneqa.in/api/v2/admin/rest",
            learnerEndPointUrl: "https://automation.expertusoneqa.in/api/v2/learner/e1internal/rest"
        }
        credentials = {
            data: {
                id: "b3727c29-6bbc-4bc3-8276-8b232ec70222",
                client_id: "38f78440b5e4693f47361d3e5c0c80b9",
                client_secret: "ec7905d0fc328980352675c79fceaa66"
            }

        }

        break;
    case "qaProduction":
        URLConstants = {
            adminEndPointUrl: "https://urautotenant.expertusoneqa.cloud/api/v2/admin/rest",
            learnerEndPointUrl: "https://urautotenant.expertusoneqa.cloud/api/v2/learner/rest"
        }
        credentials = {
            data: {
                id: "bd80c922-e2ee-4bf2-8925-a8381fe83da7",
                client_id: "9bdca9be2ca3d6b9cc5ad9df92777576",
                client_secret: "72b93e1003c39166735bde4d7cb52b91"       
            }

        }

        break;
    case "dev":
        URLConstants = {
            adminEndPointUrl: "https://urpreprod.expertusone.cloud/api/v2/admin/rest",
            learnerEndPointUrl: "https://urpreprod.expertusone.cloud/api/v2/learner/rest"
        }
        credentials = {
            data: {
                id: "9097c936-6ef6-41fe-a2f4-aa6db5251b15",
                client_id: "3f4cc1fc7ee1807cab24595444306fa9",
                client_secret: "0dab660fcde2b1415be5de724ab5c997"
            }

        }

        break;
    default:
        throw new Error(`Invalid environment setup: ${environmentSetup}`);
}
