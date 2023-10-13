import { deleteAccount, deactivateAccount, getUserSocials, getInstructorByCourseId } from "../data/database/user.js";
import { GetUserDocIdByEmail } from "../data/database/user.js";
import { user } from "../utils/Session.js";

//? Get User email
const email = user();

//? Delete user account
export const DeleteAccount = async () => {
    const docId = await GetUserDocIdByEmail(email);
    if (!docId){
        throw new Error("User Not Found");
    };
    await deleteAccount(docId);
}

//? Deactivate user account
export const DeactivateAccount = async () => {
    debugger
    const docId = await GetUserDocIdByEmail(email);
    if (!docId){
        throw new Error("User Not Found");
    };

    const data =  {isActive : 'No'}
    await deactivateAccount(data, docId)
}
export const GetInstructorByCourseId = async (Id) => {
    try {
        const userData = await getInstructorByCourseId(Id);
        if (!userData) {
          throw new Error("status 404:  Error occurred while checking current user: User not found");
        }
        return userData;
    } catch (error) {

        throw error;
    }
}