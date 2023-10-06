import { checkCurrentUser } from "../../libraries/Api/user/userApi.js";
import { route } from "../../routers/router.js";
import { sanitizeInput } from "../../libraries/sanitizer.js";
import { ErrorMessage } from "../../libraries/errors/messages.js";
import { AddQuestion, addCourseData, update } from "../../libraries/Api/course/courseApi.js";
import { coursePhotoUpload, courseVideoUpload } from "../../utils/upload/CloudinaryFileUpload.js";
import { user } from "../../utils/Session.js";

const userEmail = user()

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

    const fields = ["title", "shortDescription", "Category", "level", "language", "time", "price", "DiscountPrice", "longDescription"];
    const allFieldsFilled = fields.every(field => getValueById(field));
    const feature = document.getElementById('featureCourse');
    const discount = document.getElementById('enableDiscount');
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
            price: getValueById("price"),
            DiscountPrice: getValueById("DiscountPrice"),
            longDescription: getValueById("longDescription"),
            enableDiscount: discount,
            featureCourse: feature
        };
        const sanitizedData =  sanitizeData(data);
        await addCourseData(sanitizedData, user.email)

        console.log(data)
    }
}

// const updateCourse = document.getElementById('submit').addEventListener("click", (e) =>
// {  
//     if(navigator.onLine)
//     {
//         update()
//     }
//     else
//     {
//       location.replace(route.offlinePageUrl);
//     }
// });

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

// document.getElementById("videoUpload").addEventListener("click", function(){
//     courseVideoUpload.open();
// }, false);

// document.getElementById("upload_widget").addEventListener("click", function(){
//     coursePhotoUpload.open();
// }, false);  