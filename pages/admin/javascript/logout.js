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

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
