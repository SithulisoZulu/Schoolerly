import { registerUser, checkCurrentUser } from "../../libraries/Api/user/userApi.js";
import { user } from '../../utils/Session.js'
import { fileUpload } from '../../utils/upload/CloudinaryFileUpload.js'
import { sanitizeInput } from "../../libraries/sanitizer.js";

document.getElementById("upload_widget").addEventListener("click", function(){
  fileUpload.open();
}, false);

const sanitizeData = (data) => {
  const sanitizedData = {};
  for (const key in data) {
    sanitizedData[key] = sanitizeInput(data[key]);
  }
  return sanitizedData;
};

const updateUser = document.getElementById('submit').addEventListener('click', async (e) => {
  const photoUrl = sessionStorage.getItem("photoUrl");
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const contact = document.getElementById('contact').value;
  const email = document.getElementById('email').value
  const select = document.getElementById('select').value
  const address = document.getElementById('address').value

  const data = {
    photoUrl,
    name,
    surname,
    contact,
    email,
    select,
    address
  };

  const sanitizedData = sanitizeData(data);
  const userEmail = user();
  const getId = await checkCurrentUser(userEmail);
  const userId = getId.id;
  await registerUser(sanitizedData, userId);
    redirectToProfileCompletePage(userId, userEmail);
})

async function checkUser() {
  const userEmail = user()
  try {
      const user = await checkCurrentUser(userEmail);
      if (user) {
        handleDOM(user);
      }
    } catch (error) {
    throw new Error("Error occurred while checking current user:", error);
  }
}

checkUser()
function handleDOM(user) {
  try {

    let email = document.getElementById("email");
    if (email) {
      email.value = user.email;
    }
  } catch (error) {
    throw new Error("An error occurred in handleDOM:", error);
  }
}

export function redirectToProfileCompletePage(userId, userEmail) {
  try {
    var url = `/auth/ProfileComplete.html?id=${encodeURIComponent(userId)}&AccessKey=${encodeURIComponent(userEmail)}`;
    window.location.replace(url);
  } 
  catch (error) {
    console.log(error);
    throw error
  }
}