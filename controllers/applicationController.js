import { getApplicationDetailsById, getStudentApplication } from "../data/database/ApplicationRepository.js";

export const GetStudentApplication = async (Email) => {
    if(!Email)  throw new Error ('Can not add to cart missing some information');
    return await getStudentApplication(Email);
}

export const GetApplicationById = async (Id) => {
    if(!Id)  throw new Error ('Can not get Application missing some information')
    return await getApplicationDetailsById(Id);
}