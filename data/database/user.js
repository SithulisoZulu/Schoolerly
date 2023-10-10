import { deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, deleteUser } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { app, databaseURL as db } from '../../libraries/firebaseApi.js';
import { redirectToUserRolePage } from "../../routers/router.js";
import { getUserDataByEmail, getUserDocIdByEmail } from "../../libraries/Api/user/getUserData.js";

//Delete User
export const  deleteAccount = async (id) =>
{
  await deleteDoc(doc(db, "users", id));
}

//Get User DocID by user email
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

//Deactivate user Account
export const deactivateAccount = async (data, id) =>
{
  const updateRef = await doc(db, "users", id);

  try {
    await updateDoc(updateRef, {
      isActive: data.isActive,
    });

    return;

  } catch (error) {
    throw error.message + "" + error.code;
  }
}

//Get user socials
export const getUserSocials = async() => {
  
}