import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { ErrorMessage as Error } from "../../../libraries/errors/messages.js";
import { successMessages as success} from '../../../libraries/success/messages.js';
import { checkCurrentUser } from '../../../libraries/Api/user/userApi.js'; 
import AuthProviders from '../../../libraries/auth/AuthProviders.js'; 
import { redirectToLoginPage } from '../../../routers/router.js';


const password = document.getElementById('submit').addEventListener("click", (e) =>{
  const userEmail = document.getElementById('email').value;  
    sendResetPassword(userEmail); 
  });

export function sendResetPassword(userEmail) {
  const auth = getAuth();

  if (!userEmail) {
    let errorMessage = Error.EmailRequired;
    document.dispatchEvent(new CustomEvent('resetPasswordError', { detail: { errorMessage } }));
    return;
  }

  getUser();

  async function getUser() {
    const user = await checkCurrentUser(userEmail);
    handleUser(user);
  }

  function handleUser(user) {
    if (user) {
      if (user.provider === AuthProviders.GoogleAuthProvider || user.provider === AuthProviders.FacebookAuthProvider) {
        let errorMessage = Error.AuthProvider;
        document.dispatchEvent(new CustomEvent('resetPasswordError', { detail: { errorMessage } }));
        return;
      }

      if (user) {
        sendPasswordResetEmail(auth, userEmail)
          .then(() => {
            document.dispatchEvent(new CustomEvent('resetPasswordSuccess', { detail: { userEmail } }));
            redirectToLoginPage()
          })
          .catch((error) => {
            let errorMessage = Error.WrongEmail;
            document.dispatchEvent(new CustomEvent('resetPasswordError', { detail: { errorMessage } }));
            return;
          }
        );
      }
    }
  }
}

function handleResetPasswordSuccess(event) {
  const { userEmail } = event.detail;
  document.getElementById('alert-Error').classList.add('visually-hidden');
  document.getElementById('email-span').textContent = userEmail;
  document.getElementById('message').textContent = success.PasswordResetEmailSent;
  document.getElementById('alert-Div').classList.remove('visually-hidden');
}

function handleResetPasswordError(event) {
  const { errorMessage } = event.detail;
  document.getElementById('error-message').textContent = errorMessage;
  document.getElementById('alert-Error').classList.remove('visually-hidden');
}

document.addEventListener('resetPasswordSuccess', handleResetPasswordSuccess);
document.addEventListener('resetPasswordError', handleResetPasswordError);


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