import { URLConstants } from "../data/apiData/apiUtil";
import { createEnrollmentForCourse, deleteCourse, getInstanceCourseList, listCourseEnrollment, listofCourse, updateEnrolledCourse } from "../data/apiData/formData";
import { postRequest } from "../utils/requestUtils";
import { assertResponse, assertStatus } from "../utils/verificationUtils";

let endPointURL = URLConstants.adminEndPointUrl
export async function retrive_listofCourse(authorization: any) {
    let response = await postRequest(listofCourse, endPointURL, authorization);
    console.log(response.data);
    await assertStatus(response.status, 200);
}

export async function enrollCourse(code: any, userName: string, authorization: any) {
    let response = await postRequest(createEnrollmentForCourse(code, userName), endPointURL, authorization);
    console.log(response.data);

}

export async function completeEnrolledCourse(code: any, userName: string, authorization: any) {
    let response = await postRequest(updateEnrolledCourse(code, userName, "completed"), endPointURL, authorization);
    console.log(response.data);

}

export async function CancelEnrolledCourse(code: any, userName: string, authorization: any) {
    let response = await postRequest(updateEnrolledCourse(code, userName, "cancel"), endPointURL, authorization);
    console.log(response.data);

}

export async function listEnrolledCourse(code: any, userName: string, authorization: any) {
    let response = await postRequest(listCourseEnrollment(code, userName), endPointURL, authorization);
    console.log(response.data); 

}

export async function deleteTheCreatedCourse(code: any, authorization: any) {
    let response = await postRequest(deleteCourse(code), endPointURL, authorization);
    console.log(response.data);
    await assertStatus(response.status, 200);
    await assertResponse(response.data.status, "success");

}

//Admin->getgetInstanceCourseAPI
export async function getInstanceCourseAPI(entity_code: any, authorization: any) {
    let response = await postRequest(getInstanceCourseList(entity_code), endPointURL, authorization);
    console.log(response.data);
    await assertStatus(response.status, 200);
    await assertResponse(response.data.status, "success");

}

export async function updateCourseEnrollment(code: any,userName: string,status: any, authorization: any) {
    let response = await postRequest(updateEnrolledCourse(code,userName,status), endPointURL, authorization);
    console.log(response.data);
}