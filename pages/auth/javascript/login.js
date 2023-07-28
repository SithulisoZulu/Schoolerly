import {getAuth,signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { app } from '../../../javascript/firebaseApi.js';
import { loadingPageUrl } from '../../../routers/router.js';

const auth = await getAuth(app);

const submit = document.getElementById('submit').addEventListener("click", (e) =>
  {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user.email;
      sessionStorage.setItem("currentUser", user);
      location.replace(loadingPageUrl);
    })
    .catch((error) => {
      location.replace("/pages/error/nouserError.html");
    });
  }
);