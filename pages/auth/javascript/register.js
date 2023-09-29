import { registerUser } from "../../../libraries/Api/user/userApi.js";
import { sanitizeInput } from "../../../libraries/sanitizer.js";
import { checkCurrentUser } from "../../../libraries/Api/user/userApi.js";
import { user } from '../../../utils/Session.js'

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dpnz1b1ud',
    theme: "minimal",
    uploadPreset: 'coursesPhotos'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        var photoUrl = result.info.url 
        sessionStorage.setItem("photoUrl", photoUrl)
        document.getElementById("upload_widget").value = result.info.original_filename;
      }
    }
  )
  document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
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
  const userEmail = sessionStorage.getItem("userEmail")
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
    var url = `/pages/auth/ProfileComplete.html?id=${encodeURIComponent(userId)}&AccessKey=${encodeURIComponent(userEmail)}`;
    window.location.replace(url);
  } 
  catch (error) {
    console.log(error);
    throw error
  }
}