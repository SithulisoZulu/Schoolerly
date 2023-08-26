import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { collection, addDoc, Timestamp,  doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { app, databaseURL as db } from "../../../libraries/firebaseApi.js";
import { successMessages as success} from '../../../libraries/success/messages.js';
import { ErrorMessage as Error } from "../../../libraries/errors/messages.js";

import { route } from '../../../routers/router.js';

const auth = getAuth(app); 


const submit = document.getElementById('submit').addEventListener("click", (e) =>
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

async function update(){
    const photo = sessionStorage.getItem("photoUrl")
    const courseDocumentId = sessionStorage.getItem("courseDocumentId")
    var video = sessionStorage.getItem("photoUrl")
    var fileName =sessionStorage.getItem("videoName")
    const updateRef = doc(db, "courses", courseDocumentId);
   var videoUrl = document.getElementById("videoUrl").value;


    // To update data
await updateDoc(updateRef, {
    photo: photo,
    video: video,
    fineName: fileName,
    videoUrl: videoUrl
});
    location.replace(route.instructorCourseAdditionalInformation)
}


var photoUpload = cloudinary.createUploadWidget({
    cloudName: 'dpnz1b1ud', 
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
        uploadPreset: 'usersProfilePhotos'}, (error, result) => { 
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
    
        
      document.getElementById("videoUpload").addEventListener("click", function(){
        videoUpload.open();
        }, false);
    
    