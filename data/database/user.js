import { deleteDoc, doc, updateDoc, query, getDocs, collection, limit, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
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

export const getInstructorById = async (Id) => {
  if (Id === null || Id === undefined) {
    throw new Error("Invalid Id");
  }
  const userQuery = query(collection(db, "users"), where("id", "==", Id), limit(1));
  try {
      const querySnapshot = await getDocs(userQuery);
      const userData = querySnapshot.docs.map(doc => doc.data());
      const user = userData[0];
      return user;
  } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
  }
}

export const getSocials = async(Id) => {
  if (Id === null || Id === undefined) {
    throw new Error("Invalid Invalid Id Parameter");
}
const socialsQuery = query(collection(db, "socials"), where("userId", "==", Id));
try {
    const querySnapshot = await getDocs(socialsQuery);
    const userSocials = querySnapshot.docs.map(doc => doc.data());
    const socials = userSocials[0];
    return socials;
} catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
}
}

export const getUserDetailsById = async (Id) => {
  try {
    if (!Id) {
      throw new Error("Invalid Id parameter");
    }
    const Query = query(collection(db, "users"), where("id", "==", Id));
    const querySnapshot = await getDocs(Query);
    const user = querySnapshot.docs.map(doc => doc.data());
    return user[0];
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  } 
}