import { redirectToUserErrorPage, redirectToUserRolePage } from '../../../routers/router.js';
import { roleMapping } from './roleMapping.js';
import { checkCurrentUser } from "../../../libraries/Api/user/userApi.js";
import { SECRET } from '/security.js'

var userEmail = getAndDecryptParameter('email');

checkCurrentUserRole(userEmail)

export async function checkCurrentUserRole(userEmail) {
  // const userEmail = sessionStorage.getItem("userEmail")
  try {
    if (!userEmail) {
      throw new Error("Error 401 Unauthorized: No Email Provided");
    }

    const user = await checkCurrentUser(userEmail);
    if (!user) {
     redirectToUserErrorPage()
    } else {
      const Role = user.Role;
      if (roleMapping[Role]) {
        const iv = CryptoJS.lib.WordArray.random(16);
        const email = CryptoJS.AES.encrypt(user.email, SECRET, { iv: iv }).toString();
        sessionStorage.setItem("userEmail", email)
        window.location.href = roleMapping[Role]
      } else {
        redirectToUserRolePage()
      }
    }
  } catch (error) {
    throw new Error("Internal error: " + error);
  }
}



// Function to extract and decrypt URL parameters
function getAndDecryptParameter(paramName) {

  var encryptedValue = getParameterByName(paramName);
  if (encryptedValue) {
  var decryptedValue = CryptoJS.AES.decrypt(encryptedValue, SECRET).toString(CryptoJS.enc.Utf8);
  return decryptedValue;
  }
  return null;
  }
  
  // Function to extract URL parameters
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}