import { DeleteAccount }  from '../../controllers/user.js'
import { route } from '../../routers/router.js'

const submit = document.getElementById('delectAccount').addEventListener("click", async (e) =>
{ 
  await DeleteAccount()
  redirectToMediaUploadPage()
});


const  redirectToMediaUploadPage = async() => {
  try {
    var url = `${route.loginPageUrl}`;
    await sessionStorage.clear();
    window.location.replace(url);
  } 
  catch (error) {
    console.log(error);
    throw error
  }
}