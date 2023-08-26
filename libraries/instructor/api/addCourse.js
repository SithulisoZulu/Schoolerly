import { getAuth } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { app, databaseURL as db } from "../../../libraries/firebaseApi.js";
import { ErrorMessage as Error } from "../../../libraries/errors/messages.js";
import { route } from '../../../routers/router.js';
import courseStatues from '../../../libraries/courseStatuses.js';

const auth = getAuth(app); 
var userEmail = sessionStorage.getItem('userEmail')

const submit = document.getElementById('submit').addEventListener("click", (e) =>
{  
    if(navigator.onLine)
    {
        checkData()
    }
    else
    {
      sessionStorage.setItem("page", "login")
      location.replace(route.offlinePageUrl);
    }

});
// const date = new Date();

async function addCourseData()
{

    var title  = document.getElementById("title").value;
    var shortDescription  = document.getElementById("shortDescription").value;
    var Category  = document.getElementById("Category").value;
    var level  = document.getElementById("level").value;
    var language  = document.getElementById("language").value;
    var time  = document.getElementById("time").value;
    var totalCourse  = document.getElementById("totalCourse").value;
    var price  = document.getElementById("price").value;
    var DiscountPrice  = document.getElementById("DiscountPrice").value;
    var featureCourse  = document.getElementById("featureCourse").value;
    var longDescription  = document.getElementById("longDescription").value;


    var enableDiscount  = document.getElementById("enableDiscount").value;
    var discount;
    var feature;

    if(enableDiscount.checked  == true)
    {
        discount = "Yes"
    }
    else{
        discount = "No"
    }

    if(featureCourse.checked  == true)
    {
        feature = "Yes"
    }
    else{
        feature = "No"
    }

  let id = crypto.randomUUID();
debugger
  const docRef = await addDoc(collection(db, "courses"), {
    title: title,
    shortDescription: shortDescription,
    level: level,
    categoryId: Category,
    status: courseStatues.Applied,
    courseId: id,
    creationDate: Timestamp.fromDate(new Date()),
    language: language,
    time: time,
    totalCourse: totalCourse,
    featureCourse: feature,
    userEmail: userEmail,
    discount: DiscountPrice,
    longDescription: longDescription
  }).then(docRef => {
    sessionStorage.setItem("courseId", id)
    sessionStorage.setItem("courseDocumentId", docRef.id)
    Redirect()
})
.catch((error) => {
    document.getElementById("error").classList.remove("visually-hidden")
    document.getElementById("error-message").innerHTML = Error.errorCreateCourse  + " " + error
})
}



function checkData()
{
    var title  = document.getElementById("title").value;
    var shortDescription  = document.getElementById("shortDescription").value;
    var Category  = document.getElementById("Category").value;
    var level  = document.getElementById("level").value;
    var language  = document.getElementById("language").value;
    var time  = document.getElementById("time").value;
    var totalCourse  = document.getElementById("totalCourse").value;
    var price  = document.getElementById("price").value;
    var DiscountPrice  = document.getElementById("DiscountPrice").value;
    var featureCourse  = document.getElementById("featureCourse");
    var longDescription  = document.getElementById("longDescription").value;

    var enableDiscount  = document.getElementById("enableDiscount");
    var discount;
    var feature;

    if(enableDiscount.checked)
    {
        discount = "Yes"
    }
    else{
        discount = "No"
    }

    if(featureCourse.checked)
    {
        feature = "Yes"
    }
    else{
        feature = "No"
    }

    if(!title || !shortDescription||!Category||!level||!language||!time||!totalCourse||!price||!DiscountPrice||!discount||!feature||!longDescription)
    {
        document.getElementById("error").classList.remove("visually-hidden")
        document.getElementById("error-message").innerHTML = Error.dataNeeded
    }
    else
    {
        addCourseData();
    }
}


function Redirect()
{
  location.replace(route.instructorUploadCourseMedia)
}
