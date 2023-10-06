import { deleteAccount } from "../data/database/user.js";
import { GetUserDocIdByEmail } from "../data/database/user.js";
import { user } from "../utils/Session.js";

import userRoles from "../libraries/roles.js";

const email = user();

export const DeleteAccount = async (id) => {
    debugger
    const docId = await GetUserDocIdByEmail(email);
    if (!docId){
        throw new Error("User Not Found");
    };
    await deleteAccount(docId);
}