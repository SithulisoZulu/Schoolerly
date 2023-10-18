import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateEmail, OAuthProvider, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { serverTimestamp, setDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { getUserDataByEmail, getUserSocials } from './getUserData.js'
import { app, databaseURL as db } from "../../firebaseApi.js";
import { ErrorMessage } from "../../errors/messages.js";
import { redirectToUserErrorPage, redirectToUserRolePage } from '../../../routers/router.js';
import { sanitizeInput } from '../../sanitizer.js'
import AuthProviders from '../../auth/AuthProviders.js';
import userRoles from '../../roles.js';

const auth = getAuth(app); 
const provider = new GoogleAuthProvider();
const MicrosoftProvider = new OAuthProvider('microsoft.com');
const isActive = {Yes: 'Yes', No: 'No'}

//#region signup
/**
 * @param {string} email The string
 * @param {string} password The string
 */
export default async function CreateUser(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await createUser(await userCredentials.user.uid, await userCredentials.user.email);
      sessionStorage.setItem("user", JSON.stringify(await userCredentials.user));
      redirectToLoadingPage(await userCredentials.user.uid, await userCredentials.user.email);
  } catch (error) {
    handleCreateUserError(error);
    throw new Error("500: Internal server error" + error);
  }
}

export async function signUpWithGoogle() {
  debugger
  try {
    const result = await signInWithPopup(auth, provider);
 
    await checkAndAddUser(result.user, await result.user.email, await result.user.uid);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      redirectToLoadingPage(await result.user.uid, await result.user.email)
  } catch (error) {
    throw new Error("Error signing up with Google:", error);
  }
}

/**
 * Allows users to sign up using their Microsoft account.
 * @returns {Promise<void>} A promise that resolves when the sign-up process is complete.
 */
export async function signUpWithMicrosoft() {
  debugger
  try {
    const result = await signInWithPopup(auth, MicrosoftProvider);
    const uid = await result.user.uid;
    const userEmail = await result.user.email;

    await checkAndAddUser(await result.user, userEmail, uid);
    redirectToLoadingPage(uid, userEmail);
  } catch (error) {
    throw new Error("Error signing up with Microsoft:", error);
  }
}
//#region signup

//#region login
export async function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = await checkCurrentUser(await result.user.email);
    if(user.isActive !== isActive.Yes){
      return Promise.reject(new Error("User is not active"));
    }
    sessionStorage.setItem("user", JSON.stringify(await result.user));
    redirectToLoadingPage(user.id, await result.user.email);
  })
}

//#endregion login
export async function login(email, password)
{
  signInWithEmailAndPassword(auth, sanitizeInput(email), sanitizeInput(password))
  .then(async (userCredential) => {
   try{
    const user = await checkCurrentUser(email)
    if(user.isActive !== isActive.Yes){
      return Promise.reject(new Error("User is not active"));
    }
    sessionStorage.setItem("user", JSON.stringify(await userCredential.user));
    redirectToLoadingPage(await userCredential.user.uid, await userCredential.user.email)
   }catch(error) {
      throw error
   }
  })
}
//#endregion

async function checkAndAddUser(user, userEmail, uid) {
  const usersData = await getUserDataByEmail(userEmail);
  try{
    if (!usersData) {
      const docRef = await setDoc(doc(db, "users", uid), {
        DisplayName  : user.displayName,
        email        : user.email,
        Contact      : user.phoneNumber,
        Role         : userRoles.Unverified,
        id           : user.uid,
        photo        : user.photoURL,
        creationTime : user.metadata.creationTime,
        emailVerified: user.emailVerified,
        provider     : AuthProviders.GoogleAuthProvider,
        isActive     : 'Yes'
      });
    }
    if (usersData) {
      redirectToLoadingPage(uid, userEmail)
    }
  }catch (error) {
    handleCreateUserError(error)
    throw new Error(`Internal server error 500: Error adding ${user.email} this user to the data base`)
  }
}

async function createUser(uid, userEmail) {
  await setDoc(doc(db, "users", uid), 
  {
    email        : sanitizeInput(userEmail),
    Role         : userRoles.Unverified,
    id           : sanitizeInput(uid),
    creationDate : serverTimestamp(),
    emailVerified: false,
    provider     : AuthProviders.createUserWithEmailAndPassword,
    isActive     : 'Yes'
  });
}

export async function checkCurrentUser(userEmail) {
  try {
    const userData = await getUserDataByEmail(userEmail);
    if (!userData) {
      redirectToUserRolePage();
      throw new Error("status 404:  Error occurred while checking current user: User not found");
    }
    return userData;
  } catch (error) {
    handleCreateUserError(error)
    throw error;
  }
}
export async function getSocials(userEmail)
{
  try{
    const socials = await getUserSocials(userEmail)
    return socials
  } catch (error) {
    throw error
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
      Name   : data.name,
      Surname: data.surname,
      Contact: data.contact,
      email  : data.email,
      Role   : data.select,
      Address: data.address,
      photo  : data.photoUrl,
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

  const updateRef = await doc(db, "users", userId);

  try {
    await updateDoc(updateRef, {
      Name   : data.name,
      Surname: data.surname,
      Contact: data.contact,
      email  : data.email,
      Role   : data.select,
      Address: data.address,
      photo  : data.photoUrl,
      About  : data.about
    });

    return;

  } catch (error) {
    handleCreateUserError(error)
    throw error.message + "" + error.code;
  }
} 

export async function updateUserEmail(email, newEmail)
{
  const user = await checkCurrentUser(email)

  if(!user || user.provider === AuthProviders.FacebookAuthProvider || user.provider === AuthProviders.GoogleAuthProvider)
  {
    return

  }

  updateEmail(auth.currentUser, email).then(async () => {
    await updateDbEmail(email, newEmail)
  }).catch((error) => {
    throw error
  });
}

export async function addUserSocials(uid, sanitizedSocials, email)
{
  const userSocials = sanitizedSocials;
  try{
    if (userSocials) {
      const docRef = await setDoc(doc(db, "socials", uid), {
        facebook: userSocials.facebook,
        twitter: userSocials.twitter,
        instagram: userSocials.instagram,
        youtube: userSocials.youtube,
        userEmail: email,
        userId: uid,
      }).then(() => {
        var addSocials = document.getElementById("addSocials");
        var update = document.getElementById("update");
        if(addSocials)
        {
          addSocials.classList.add("visually-hidden")
        }
        if(update)
        {
          update.classList.remove("visually-hidden")
        }
      });
    }
  }catch (error) {
    handleCreateUserError(error)
    throw new Error(`Internal server error 500: Error adding this user socials to the data base`)
  }
}
export async function updateUserSocials(uid, sanitizedSocials, email)
{
  const userSocials = sanitizedSocials;
  try{
    if (userSocials) {
      const docRef = await setDoc(doc(db, "socials", uid), {
        facebook: userSocials.facebook,
        twitter: userSocials.twitter,
        instagram: userSocials.instagram,
        youtube: userSocials.youtube,
        userEmail: email,
        userId: uid,
      }).then(() => {
        var addSocials = document.getElementById("addSocials");
        var update = document.getElementById("update");
        if(addSocials)
        {
          addSocials.classList.add("visually-hidden")
        }
        if(update)
        {
          update.classList.remove("visually-hidden")
        }
      });
    }
  }catch (error) {
    handleCreateUserError(error)
    throw new Error(`Internal server error 500: Error adding this user socials to the data base`)
  }
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

export async function updateDbEmail(email, newEmail)
{
  const user = await checkCurrentUser(newEmail);
  const updateRef = doc(db, "users", await  user.id);

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
    var url = `/auth/Authenticating.html?id=${encodeURIComponent(userId)}&AccessKey=${encodeURIComponent(userEmail)}`;
    window.location.replace(url);
  } 
  catch (error) {
    throw error
  }
}