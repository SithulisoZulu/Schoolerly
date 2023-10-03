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

//#region signup
/**
 * @param {string} email The string
 * @param {string} password The string
 */
export default async function CreateUser(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    sessionStorage.setItem("user", JSON.stringify(await userCredentials.user));

    await createUser(await userCredentials.user.uid, await userCredentials.user.email);
      redirectToLoadingPage(await userCredentials.user.uid, await userCredentials.user.email);
  } catch (error) {
    handleCreateUserError(error);
    throw new Error("500: Internal server error" + error);
  }
}

export async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);

    sessionStorage.setItem("user", JSON.stringify(result.user));
 
    await checkAndAddUser(result.user, await result.user.email, await result.user.uid);
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
//#endregion signup


//#region login
export async function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      sessionStorage.setItem("user", JSON.stringify(await result.user));

      const userData = await checkCurrentUser(await result.user.email);
      const userId = userData.id;

      redirectToLoadingPage(userId, await result.user.email);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      throw new Error(`Login failed: " , ${errorCode},  ${errorMessage}, ${email}\n${credential}`);
  });
}

export async function login(email, password)
{
  signInWithEmailAndPassword(auth, sanitizeInput(email), sanitizeInput(password))
  .then(async (userCredential) => {
    sessionStorage.setItem("user", JSON.stringify(await userCredential.user));

    const userId= await userCredential.user.uid
    const userEmail = await userCredential.user.email
   try{
    redirectToLoadingPage(userId, userEmail)
   }catch(error) {
      throw error
   }
  })
  .catch((error) => {
    redirectToUserErrorPage()
  });
}
//#endregion

async function checkAndAddUser(user, userEmail, uid) {
  const usersData = await getUserDataByEmail(userEmail);
  try{
    if (!usersData) {
      const docRef = await setDoc(doc(db, "users", uid), {
        DisplayName: user.displayName,
        email: user.email,
        Contact: user.phoneNumber,
        Role: userRoles.Unverified,
        id: user.uid,
        photo: user.photoURL,
        creationTime: user.metadata.creationTime,
        emailVerified: user.emailVerified,
        provider: AuthProviders.GoogleAuthProvider
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
      Name: data.name,
      Surname: data.surname,
      Contact: data.contact,
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
    var url = `/auth/Authenticating.html?id=${encodeURIComponent(userId)}&AccessKey=${encodeURIComponent(userEmail)}`;
    window.location.replace(url);
  } 
  catch (error) {
    throw error
  }
}