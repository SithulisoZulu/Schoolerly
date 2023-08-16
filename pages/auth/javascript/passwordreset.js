import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { ErrorMessage as Error } from "../../../libraries/errors/messages.js";
import { successMessages as success} from '../../../libraries/success/messages.js';
import { app } from '../../../libraries/firebaseApi.js';

const auth = await getAuth(app);

const password = document.getElementById('submit').addEventListener("click", (e) =>{
    sendResetPassword();  
  });

  function sendResetPassword()
  {
    const email= document.getElementById('email').value;
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
      document.getElementById('alert-Error').classList.add('visually-hidden');
      const emailSpan = document.getElementById('email-span').innerHTML = email;
      document.getElementById('message').innerHTML = success.PasswordResetEmailSent; 
      var alert =  document.getElementById('alert-Div').classList.remove('visually-hidden');
    })
    .catch((error) => {
      if(!email)
      {
        document.getElementById('error-message').innerHTML = Error.EmailRequired;
      }
      else
      {
        document.getElementById('error-message').innerHTML = Error.WrongEmail;
      }
      var alert =  document.getElementById('alert-Error').classList.remove('visually-hidden');
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