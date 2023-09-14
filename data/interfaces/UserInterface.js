import { checkCurrentUser, update, updateUserEmail } from "../../libraries/Api/user/userApi.js";
import { sanitizeInput } from "../../libraries/sanitizer.js";
import { ErrorMessage } from "../../libraries/errors/messages.js";
import { successMessages } from "../../libraries/success/messages.js";
import { check } from "../../libraries/Api/GetUserDetailsByUserEmail.js";

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
    const contact = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const select = document.getElementById('select').value;
    const address = document.getElementById('address').value;
    const about = document.getElementById('about').value;

    const user =  await checkCurrentUser(email);

    if(!user)
    {
        return
    };

    const userId = user.id;
    try {
        const data = {
            photoUrl,
            name,
            surname,
            contact,
            email,
            select,
            address,
            about
        };
        
        const sanitizedData = sanitizeData(data);
        await update(sanitizedData, userId);
        await handleUpdateSuccess();
        await check();

    } catch (error) {
       await  handleUpdateError(error);
        throw error;
    };
});

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

const updateEmail = document.getElementById('updateUserEmailBtn').addEventListener('click', async (e) => { 
  const userEmail = document.getElementById("PasswordMail").value;
  const email = document.getElementById("updateUserEmail").value;
  try {
    await updateUserEmail(userEmail, email)
  } catch (error) {
    throw error
  }
});