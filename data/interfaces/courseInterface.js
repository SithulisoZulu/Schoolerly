import { checkCurrentUser } from "../../libraries/Api/user/userApi.js";
import { route } from "../../routers/router.js";
import { sanitizeInput } from "../../libraries/sanitizer.js";
import { ErrorMessage } from "../../libraries/errors/messages.js";
import { successMessages } from "../../libraries/success/messages.js";
import { check } from "../../libraries/Api/GetUserDetailsByUserEmail.js";
import * as loadingHandler from '../../libraries/loading.js'
import { AddQuestion, addCourseData, update } from "../../libraries/Api/course/courseApi.js";

const userEmail = sessionStorage.getItem("userEmail")

const submit = document.getElementById('submit').addEventListener("click", (e) =>
{  
    if(navigator.onLine)
    {
        checkData();
    }
    else {
      location.replace(route.offlinePageUrl);
    }

});

const sanitizeData = (data) => {
    const sanitizedData = {};
    for (const key in data) {
      sanitizedData[key] = sanitizeInput(data[key]);
    }
    return sanitizedData;
  };

async function checkData() {

    const user =  await checkCurrentUser(userEmail);

    function getValueById(id) {
        return document.getElementById(id).value;
    }

    function showError(message) {
        document.getElementById("error").classList.remove("visually-hidden");
        document.getElementById("error-message").textContent = message;
    }

    const fields = ["title", "shortDescription", "Category", "level", "language", "time", "totalCourse", "price", "DiscountPrice", "longDescription"];
    const allFieldsFilled = fields.every(field => getValueById(field));
    if (!allFieldsFilled) {
        showError(ErrorMessage.dataNeeded);
    } else {

        const data = {
            title: getValueById("title"),
            shortDescription: getValueById("shortDescription"),
            Category: getValueById("Category"),
            level: getValueById("level"),
            language: getValueById("language"),
            time: getValueById("time"),
            totalCourse: getValueById("totalCourse"),
            price: getValueById("price"),
            DiscountPrice: getValueById("DiscountPrice"),
            longDescription: getValueById("longDescription"),
            enableDiscount: document.getElementById("enableDiscount"),
            featureCourse: document.getElementById("featureCourse")
        };
        const sanitizedData =  sanitizeData(data);
        await addCourseData(sanitizedData, user.email)
    }
}


const updateCourse = document.getElementById('submit').addEventListener("click", (e) =>
{  
    if(navigator.onLine)
    {
        update()
    }
    else
    {
      sessionStorage.setItem("page", "login")
      location.replace(route.offlinePageUrl);
    }

});


// const saveTopic = document.getElementById('saveTopic').addEventListener("click", (e) =>
// {  
//     if(navigator.onLine)
//     {
//       AddQuestion()
//     }
//     else
//     {
//       sessionStorage.setItem("page", "login")
//       location.replace(route.offlinePageUrl);
//     }

// });






document.getElementById("videoUpload").addEventListener("click", function(){
    videoUpload.open();
}, false);
var photoUpload = cloudinary.createUploadWidget({
    cloudName: 'dpnz1b1ud',
    theme: "white",
    uploadPreset: 'coursesPhotos'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info);
        var photoUrl = result.info.url
        var thumbnail = result.info.thumbnail_url

        sessionStorage.setItem("photoUrl", photoUrl)

        document.getElementById("courseImagePreview").src = thumbnail
        document.getElementById("upload_widget").value = result.info.original_filename;
      }
    }
    
  )

document.getElementById("upload_widget").addEventListener("click", function(){
    photoUpload.open();
}, false);

var videoUpload = cloudinary.createUploadWidget({
    cloudName: 'dpnz1b1ud', 
    theme: "white",
    uploadPreset: 'coursesPhotos'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info);
        var videoUrl = result.info.url
        var thumbnail = result.info.thumbnail_url

        sessionStorage.setItem("photoUrl", videoUrl)
        sessionStorage.setItem("videoName", result.info.original_filename)
        document.getElementById("videoPreview").src = thumbnail;
        document.getElementById("videoUpload").value = result.info.original_filename;
        document.getElementById("videoLink").href = videoUrl;
        }
    }
    
    )
    