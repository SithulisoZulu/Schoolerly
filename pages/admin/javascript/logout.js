import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { route } from "../../../routers/router.js";

const sign =document.getElementById('signout').addEventListener("click", (e) =>{
    signout();   
  });

async function signout(){
  const auth = getAuth();
  signOut(auth).then(() => {
    location.replace(route.loginPageUrl);
  }).catch((error) => {
    console.log(error)
  });
}