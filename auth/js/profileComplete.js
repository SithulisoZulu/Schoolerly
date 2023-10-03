import { successMessages } from "../../libraries/success/messages.js";
import { getParameterByName } from "../../security/getParameterByName.js";



var submit =  document.getElementById('submit').addEventListener("click", (e)=>{
  const userEmail = getParameterByName('AccessKey');
  const uid = getParameterByName('id');
  redirectToLoadingPage(uid, userEmail)
});


function redirectToLoadingPage(userId, userEmail) {
    try {
      var url = `/auth/Authenticating.html?id=${encodeURIComponent(userId)}&AccessKey=${encodeURIComponent(userEmail)}`;
      window.location.replace(url);
    } 
    catch (error) {
      console.log(error);
      throw error
    }
  }

  function populate()
{
    document.getElementById("message").innerHTML = successMessages.ProfileUpdated;
    document.getElementById("message2").innerHTML = successMessages.useProfile;
}

populate()