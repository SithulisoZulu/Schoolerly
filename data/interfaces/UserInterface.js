import { checkCurrentUser, update, addUserSocials, updateUserEmail, updateUserSocials } from "../../libraries/Api/user/userApi.js";
import { sanitizeInput } from "../../libraries/sanitizer.js";
import { ErrorMessage } from "../../libraries/errors/messages.js";
import { successMessages } from "../../libraries/success/messages.js";
import { check } from "../../libraries/Api/GetUserDetailsByUserEmail.js";
import * as loadingHandler from '../../libraries/loading.js'
import { user } from "../../utils/Session.js";
import { GetAllCourseByInstructorId } from "../../controllers/course.js";

const email = user()
const currentUser =  await checkCurrentUser(email);


const sanitizeData = (data) => {
  const sanitizedData = {};
  for (const key in data) {
    sanitizedData[key] = sanitizeInput(data[key]);
  }
  return sanitizedData;
};

const updateUser = document.getElementById('submit').addEventListener('click', async (e) => {
  let photo;
  const photoUrl = sessionStorage.getItem("photoUrl");
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const contact = document.getElementById('number').value;
  const email = document.getElementById('email').value;
  const select = document.getElementById('select').value;
  const address = document.getElementById('address').value;
  const about = document.getElementById('about').value;


  if(!currentUser)
  {
    return
  };

  if(photoUrl)
  {
    photo = photoUrl
  }
  else
  {
    photo = currentUser.photo
  }

  const userId = currentUser.id;
  try {
    const data = {
      photo,
      name,
      surname,
      contact,
      email,
      select,
      address,
      about
    };

    loadingHandler.isLoading()
    const sanitizedData = sanitizeData(data);
    await update(sanitizedData, userId);
    await check(email);
    loadingHandler.isNotLoading()
    await handleUpdateSuccess();

  } catch (error) {
      await  handleUpdateError(error);
      throw error;
  };
});


const updateEmail = document.getElementById('updateUserEmailBtn').addEventListener('click', async (e) => { 
  const newEmail = document.getElementById("updateUserEmail").value;

  try {
    loadingHandler.isLoadingEmailUpdate()
    await updateUserEmail(email, newEmail)
    await check(newEmail)
    loadingHandler.isNotLoadingEmailUpdate()
  } catch (error) {
    throw error
  }
});



// function validateEmail(email) {
//     // Regular expression to validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }






var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dpnz1b1ud', 
  uploadPreset: 'coursesPhotos'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      var photoUrl = result.info.url ;
      sessionStorage.setItem("photoUrl", photoUrl)
      var avatar = document.getElementById("photo");
      avatar.src = photoUrl;
    }
  }
);
document.getElementById("upload_widget").addEventListener("click", function(){
  myWidget.open();
}, false);


async function handleUpdateSuccess(){
  document.getElementById('message').innerText = successMessages.updateUser;
  document.getElementById('alert-div').classList.remove('visually-hidden');
};

async function handleUpdateError(error) {
  const errorCode = error.code
  document.getElementById('error-message').innerText = ErrorMessage.UpdateUser;
  document.getElementById('alert-Error').classList.remove('visually-hidden');
}

const sanitizeSocials = (data) => {
  const sanitizedSocials = {};
  for (const key in data) {
    sanitizedSocials[key] = sanitizeInput(data[key]);
  }
  return sanitizedSocials;
};

const addSocials = document.getElementById('addSocials').addEventListener('click', async (e) => { 
  const email = document.getElementById('email').value;
  const facebook = document.getElementById("facebookId").value;
  const twitter = document.getElementById('twitter').value;
  const instagram = document.getElementById('instagram').value;
  const youtube = document.getElementById('youtube').value;

  const data = {
    facebook,
    twitter,
    instagram,
    youtube,
    email,
  };

  const sanitizedSocials = sanitizeSocials(data);
  try {
      const user = await checkCurrentUser(email)
      if(!user)
      {
        return
      }
      loadingHandler.isLoadingUpdateSocials()
      await addUserSocials(user.id, sanitizedSocials, user.email)
      loadingHandler.isNotLoadingUpdateSocials()
  } catch (error) {
    throw error
  }
});

const updateSocials = document.getElementById('update').addEventListener('click', async (e) => { 
  const email = document.getElementById('email').value;
  const facebook = document.getElementById("facebookId").value;
  const twitter = document.getElementById('twitter').value;
  const instagram = document.getElementById('instagram').value;
  const youtube = document.getElementById('youtube').value;

  const data = {
    facebook,
    twitter,
    instagram,
    youtube,
    email,
  };

  const sanitizedSocials = sanitizeSocials(data);
  try {
      const user = await checkCurrentUser(email)
      if(!user)
      {
        return
      }
      loadingHandler.isLoadingUpdateSocials()
      await updateUserSocials(user.id, sanitizedSocials, user.email)
      loadingHandler.isNotLoadingUpdateSocials()
  } catch (error) {
    throw error
  }
});


const allCourse = async (currentUser) => {
  const courses = await GetAllCourseByInstructorId(currentUser.id)
  document.getElementById('numCourses').textContent = courses.length
}

allCourse(currentUser)