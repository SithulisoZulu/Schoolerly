import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateEmail  } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { serverTimestamp, setDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { getUserDataByEmail } from './getUserData.js'
import { app, databaseURL as db } from "../../firebaseApi.js";
import { successMessages as success} from '../../success/messages.js';
import { ErrorMessage } from "../../errors/messages.js";
import userRoles from '../../roles.js';
import { redirectToUserRolePage } from '../../../routers/router.js';
import AuthProviders from '../../auth/AuthProviders.js';
import { sanitizeInput } from '../../sanitizer.js'
// import { redirectToProfileCompletePage } from '../../../pages/auth/javascript/register.js';

const auth = getAuth(app); 
const provider = new GoogleAuthProvider();

/**
 * @param {string} email The string
 * @param {string} password The string
 */

//#region signup
export default async function CreateUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    var userEmail = user.email;
    var uid = user.uid;
    document.getElementById('alert-success').classList.remove('visually-hidden');
    document.getElementById('message').innerText = success.UserCreated;
    sessionStorage.setItem("userEmail", userEmail);
    sessionStorage.setItem("userId", uid)
    await createUser(uid, userEmail);
    redirectToLoadingPage(uid, userEmail)
  } catch (error) {
    handleCreateUserError(error);
    throw new Error("500: Internal server error" + error);
  }
}

export async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const loggedInUser = result.user;
    const uid = loggedInUser.uid
    const userEmail = loggedInUser.email;

    await checkAndAddUser(loggedInUser, userEmail, uid);
      redirectToProfileCompletePage(uid, userEmail)
  } catch (error) {
    throw new Error("Error signing up with Google:", error);
  }
}

//#endregion signup

async function checkAndAddUser(loggedInUser, userEmail, uid) {
  const usersData = await getUserDataByEmail(userEmail);
  try{
    if (!usersData) {
      const docRef = await setDoc(doc(db, "users", uid), {
        DisplayName: loggedInUser.displayName,
        email: loggedInUser.email,
        Contact: loggedInUser.phoneNumber,
        Role: userRoles.Unverified,
        id: loggedInUser.uid,
        photo: loggedInUser.photoURL,
        creationTime: loggedInUser.metadata.creationTime,
        emailVerified: loggedInUser.emailVerified,
        provider: AuthProviders.GoogleAuthProvider
      }).then(() => {
        sessionStorage.setItem("userId", uid);
        sessionStorage.setItem("userEmail", userEmail);
      });
    }

    if (usersData.length >= 1) {
      sessionStorage.setItem("userEmail", userEmail);
      sessionStorage.setItem("userId", uid)
      redirectToLoadingPage(uid, userEmail)
    }
  }catch (error) {
    handleCreateUserError(error)
    throw new Error(`Internal server error 500: Error adding ${loggedInUser.email} this user to the data base`)
  }
}

async function createUser(uid, userEmail) {
  
    await setDoc(doc(db, "users", uid), {
    email: sanitizeInput(userEmail),
    Role: userRoles.Unverified,
    id: sanitizeInput(uid),
    creationDate: serverTimestamp(),
    emailVerified: false,
    provider: AuthProviders.createUserWithEmailAndPassword
  });
}

export async function checkCurrentUser(userEmail) {
  try {
    const userData = await getUserDataByEmail(userEmail);
    if (!userData) {
      redirectToUserRolePage();
      throw new Error("Error occurred while checking current user: User not found");
    }
    return userData;
  } catch (error) {
    handleCreateUserError(error)
    throw error;
  }
}

/**
 * Add the newly created user data in the Firestore database.
 * @param {Object} data - An object containing the updated user data.
 * @param {string} userId - The ID of the user to be updated in the Firestore database.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export async function registerUser(data, userId) {

  const updateRef = await doc(db, "users", userId);

  try {
    await updateDoc(updateRef, {
      Name: data.name,
      Surname: data.surname,
      Contact: data.contact,
      Date: '',
      email: data.email,
      Role: data.select,
      Address: data.address,
      photo: data.photoUrl,
    });

    return;

  } catch (error) {
    handleCreateUserError(error)
    throw error.message + "" + error.code;
  }
} 

/**
 * Updates user data in the Firestore database.
 * @param {Object} data - An object containing the updated user data.
 * @param {string} userId - The ID of the user to be updated in the Firestore database.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export async function update(data, userId) {
  const updateRef = doc(db, "users", userId);

  try {
    await updateDoc(updateRef, {
      Name: data.name,
      Surname: data.surname,
      Contact: data.contact,
      Date: '',
      email: data.email,
      Role: data.select,
      Address: data.address,
      photo: data.photoUrl,
      About:data.about
    });

    return;

  } catch (error) {
    handleCreateUserError(error)
    throw error.message + "" + error.code;
  }
} 

export async function updateUserEmail(userEmail, email)
{
  const user = await checkCurrentUser(userEmail)

  if(!user)
  {
    return
  }

  updateEmail(auth.currentUser, email).then(async () => {
    await updateDbEmail(userEmail, email)
  }).catch((error) => {
    throw error
  });
}

async function handleCreateUserError(error) {
  const errorCode = error.code;
  const errorMessage = document.getElementById('error-message');
  const alertError = document.getElementById('alert-Error');
  if(errorMessage && alertError)
  {
    errorMessage.innerText = ErrorMessage.SignupErrorMessage + " " + errorCode + " " + ErrorMessage.PleaseTry;
    alertError.classList.remove('visually-hidden');
  };
}

export async function updateDbEmail(userEmail, email)
{
  const user = await checkCurrentUser(userEmail)
  const userId = user.id
  const updateRef = doc(db, "users", userId);

  try {
    await updateDoc(updateRef, {
      email: email,
    });

    return;

  } catch (error) {
    throw error + error.message + "" + error.code;
  }
}


function redirectToLoadingPage(userId, userEmail) {
  try {
    var url = `/pages/auth/Authenticating.html?id=${encodeURIComponent(userId)}&AccessKey=${encodeURIComponent(userEmail)}`;
    window.location.replace(url);
  } 
  catch (error) {
    console.log(error);
    throw error
  }
}

function redirectToProfileCompletePage(userId, userEmail) {
  try {
    var url = `/pages/auth/ProfileComplete.html?id=${encodeURIComponent(userId)}&AccessKey=${encodeURIComponent(userEmail)}`;
    window.location.replace(url);
  } 
  catch (error) {
    console.log(error);
    throw error
  }
}