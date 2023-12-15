import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateEmail, OAuthProvider, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { serverTimestamp, setDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { app, databaseURL as db } from "../../libraries/firebaseApi.js";
import { getUserDataByEmail } from '../../libraries/Api/user/getUserData.js';

const auth = getAuth(app); 
const provider = new GoogleAuthProvider();
const MicrosoftProvider = new OAuthProvider('microsoft.com');
const isActive = {Yes: 'Yes', No: 'No'}
const cartFeedback = document.getElementById('couponErrorHolder')
document.getElementById('loginWithEmailAndPassword').addEventListener("click",  (e) =>
  {
   if(navigator.onLine)
    {
      const email = document.getElementById('loginModalEmail').value;
      const password = document.getElementById('loginModalPassword').value;
      if(!email || !password)
      {
        return
      }
      login(email, password)

    } else {
    }
  }
);

 async function login(email, password)
{
  signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
   try{
    const user = await checkCurrentUser(email)
    if(user.isActive !== isActive.Yes){
      return Promise.reject(new Error("User is not active"));
    }
    sessionStorage.setItem("user", JSON.stringify(await userCredential.user));
    window.location.reload();
   }catch(error) {
      throw error
   }
  })
}

async function checkCurrentUser(userEmail) {
    try {
      const userData = await getUserDataByEmail(userEmail);
      if (!userData) {
        throw new Error("status 404:  Error occurred while checking current user: User not found");
      }
      return userData;
    } catch (error) {
      throw error;
    }
}


document.getElementById('signInWithGoogle').addEventListener("click", async (e)=>{
    await signInWithGoogle();
  });

export async function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = await checkCurrentUser(await result.user.email);
        window.location.reload();
      if(user.isActive !== isActive.Yes){
        return Promise.reject(new Error("User is not active"));
      }
      sessionStorage.setItem("user", JSON.stringify(await result.user));
    })
}

const user = JSON.parse(sessionStorage.getItem('user'));

if(user)
{
    document.getElementById('login').classList.add('visually-hidden');
}