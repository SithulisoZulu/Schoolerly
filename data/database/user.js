import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, deleteUser } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { app, databaseURL as db } from '../../libraries/firebaseApi.js';
import { redirectToUserRolePage } from "../../routers/router.js";
import { getUserDataByEmail, getUserDocIdByEmail } from "../../libraries/Api/user/getUserData.js";

export const  deleteAccount = async (id) =>
{
  await deleteDoc(doc(db, "users", id));
}

export const  GetUserDocIdByEmail = async(userEmail)  => {
  try {
    const userData = await getUserDocIdByEmail(userEmail);
    if (!userData) {
      redirectToUserRolePage();
      throw new Error("status 404:  Error occurred while checking current user: User not found");
    }
    return userData;
  } catch (error) {
    throw error;
  }
}
  