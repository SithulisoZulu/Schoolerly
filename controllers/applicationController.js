import { approvedStudentApplication, createStudentApplication, getAllStudentApplicationsPendingApproval, getApplicationDetailsById, getApplicationDocIdByCorseId, getStudentApplication, getStudentApplicationByStudentId, getStudentEmergenceContactInfoByStudentId, rejectStudentApplication } from "../data/database/ApplicationRepository.js";

export const GetStudentApplication = async (Email) => {
    if(!Email)  throw new Error ('Can not add to cart missing some information');
    return await getStudentApplication(Email);
}
export const GetStudentApplicationById = async (Id) => {
    if(!Id)  throw new Error ('Can not add to cart missing some information');
    return await getStudentApplicationByStudentId(Id);
}
export const GetStudentEmergenceContactInfoByStudentId = async (Id) => {
    if(!Id)  throw new Error ('Can not add to cart missing some information');
    return await getStudentEmergenceContactInfoByStudentId(Id);
}

export const GetApplicationById = async (Id) => {
    if(!Id)  throw new Error ('Can not get Application missing some information')
    return await getApplicationDetailsById(Id);
}

export const CreateStudentApplication = async (studentInformation, emergenceContactInformation, educationInformation) => {
    if(!studentInformation || !educationInformation || !educationInformation) throw new Error('Error 500, Can not create student application, missing information');
    return await  createStudentApplication(studentInformation, emergenceContactInformation, educationInformation);
}

export const GetAllStudentApplicationsPendingApproval = async () => {
    return await getAllStudentApplicationsPendingApproval();
}

export const ApprovedStudentApplication = async (Id) => {
    const docId = await getApplicationDocIdByCorseId(Id);
    if (!docId){
        throw new Error("Application docId not Found");
    };
    return await approvedStudentApplication(docId)
}
export const RejectStudentApplication = async (Id) => {
    const docId = await getApplicationDocIdByCorseId(Id);
    if (!docId){
        throw new Error("Application docId not Found");
    };
    return await rejectStudentApplication(docId)
}

export const GetApplicationDocIdByCorseId = async (Id) => {
    const docId = await getApplicationDocIdByCorseId(Id);
    if (!docId){
        throw new Error("Course docId not Found");
    };
    return docId
}