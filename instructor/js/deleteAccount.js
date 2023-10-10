import { DeleteAccount, DeactivateAccount }  from '../../controllers/user.js'
import { route } from '../../routers/router.js'
import { loader } from '../../components/loading.js'

const loaderHolder = document.getElementById("loaderHolder");

const submit = document.getElementById('delectAccount').addEventListener("click", async (e) =>
{ 
  loaderHolder.innerHTML += loader
  await DeleteAccount()
  redirectToLoginPage()
});

const deactivateAccount = document.getElementById('deactivateAccount').addEventListener("click", async (e) =>
{ 
  loaderHolder.innerHTML += loader
  await DeactivateAccount()
  redirectToLoginPage()
});


const  redirectToLoginPage = async() => {
  try {
    var url = `${route.loginPageUrl}`;
    sessionStorage.clear();
    window.location.replace(url);
  } 
  catch (error) {
    console.log(error);
    throw error
  }
}