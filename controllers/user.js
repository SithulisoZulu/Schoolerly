import { deleteAccount, deactivateAccount, getUserSocials, getInstructorById, getSocials } from "../data/database/user.js";
import { GetUserDocIdByEmail } from "../data/database/user.js";
import { user } from "../utils/Session.js";

//? Delete user account
export const DeleteAccount = async () => {
    const email = user();
    const docId = await GetUserDocIdByEmail(email);
    if (!docId){
        throw new Error("User Not Found");
    };
    await deleteAccount(docId);
}

//? Deactivate user account
export const DeactivateAccount = async () => {
    const email = user();
    const docId = await GetUserDocIdByEmail(email);
    if (!docId){
        throw new Error("User Not Found");
    };

    const data =  {isActive : 'No'}
    await deactivateAccount(data, docId)
}
export const GetInstructorById = async (Id) => {
    try {
        const userData = await getInstructorById(Id);
        if (!userData) {
          throw new Error("status 404:  Error occurred while checking current user: User not found");
        }
        return userData;
    } catch (error) {

        throw error;
    }
}

export const GetSocials = async (Id) => {
   if(!Id)
   {
        throw new Error("Invalid Id Parameter")
    }
    const socials = await getSocials(Id);
    return socials;
}