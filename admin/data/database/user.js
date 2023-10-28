import { deleteDoc, doc, updateDoc, query, getDocs, collection, limit, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, deleteUser } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { app, databaseURL as db } from '../../libraries/firebaseApi.js';
import { redirectToUserRolePage } from "../../routers/router.js";
import { getUserDocIdByEmail } from "./getUserData.js";



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