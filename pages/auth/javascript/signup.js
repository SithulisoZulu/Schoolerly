import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { collection, addDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { app, databaseURL as db } from "../../../libraries/firebaseApi.js";
import { successMessages as success} from '../../../libraries/success/messages.js';
import { ErrorMessage as Error } from "../../../libraries/errors/messages.js";
import userRoles from '../../../libraries/roles.js';

const auth = getAuth(app); 

const submit = document.getElementById('submit').addEventListener("click", (e) =>
{  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Create a new user with the specified email and password
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    document.getElementById('alert-success').classList.remove('visually-hidden')
    document.getElementById('message').innerHTML = success.UserCreated;
    addUserData();
  })
  .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  document.getElementById('error-message').innerHTML = Error.SignupErrorMessage + " " + errorCode;
  document.getElementById('alert-Error').classList.remove('visually-hidden')
  });
}
);


async function addUserData()
{
  let id = crypto.randomUUID();
  const email = document.getElementById('email').value;

  const docRef = await addDoc(collection(db, "users"), {
    Name: "",
    email: email,
    Role: await userRoles.Unverified,
    Surname: "",
    id: id,
    creationTime: Date.now(),
    emailVerified: "false",
    photo: "",
    DisplayName: "",
    Date: "",
    contact: "",
    address: "",
  });
}


const closeError = document.getElementById('closeError').addEventListener("click", (e) =>{
    closeErrorCard()   
  });
  
  function closeErrorCard()
  {
    document.getElementById('alert-Error').classList.add('visually-hidden');
  }
  
  
  const closeEmailSent = document.getElementById('closeEmailSent').addEventListener("click", (e) =>{
    closeEmailSentCard()   
  });
  
  function closeEmailSentCard()
  {
    document.getElementById('alert-Div').classList.add('visually-hidden');
  }