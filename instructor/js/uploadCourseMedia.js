import { loader } from '../../components/loading.js'
import { route } from '../../routers/router.js'
import { UpdateCourse } from '../../controllers/course.js'
import { getParameterByName } from '../../security/getParameterByName.js'
import { sanitizeInput } from '../../libraries/sanitizer.js'

import { coursePhotoUpload, courseVideoUpload } from '../../utils/upload/CloudinaryFileUpload.js'


const loaderHolder = document.getElementById("loaderHolder")


const updateCourse = document.getElementById('submit').addEventListener("click", async (e) =>
{  
    if(navigator.onLine)
    {
      const sanitizedData =  sanitizeData(data);
      loaderHolder.innerHTML += loader
      await UpdateCourse(sanitizedData)

      redirectToAdditionalInfoPage(sanitizedData.id, sanitizedData.docId)
    }
    else
    {
      location.replace(route.offlinePageUrl);
    }
});

const sanitizeData = (data) => {
    const sanitizedData = {};
    Object.keys(data).forEach((key) => {
      sanitizedData[key] = sanitizeInput(data[key]);
    });
    return sanitizedData;
};

const data  = {
    id          : getParameterByName('id'),
    docId       : getParameterByName('doc'),
    photo       : sessionStorage.getItem("photoUrl"),
    video       : sessionStorage.getItem("photoUrl"),
    fileName    : sessionStorage.getItem("videoName"),
    videoUrl    : document.getElementById("videoUrl").value
}

function redirectToAdditionalInfoPage(id, docId) {
    try {
      var url = `${route.instructorCourseAdditionalInformation}?id=${encodeURIComponent(id)}&doc=${encodeURIComponent(docId)}`;
      window.location.replace(url);
    } 
    catch (error) {
      console.log(error);
      throw error
    }
}

document.getElementById("videoUpload").addEventListener("click", function(){
    courseVideoUpload.open();
}, false);

document.getElementById("upload_widget").addEventListener("click", function(){
    coursePhotoUpload.open();
}, false); 

document.getElementById("remove").addEventListener("click", function(){
   sessionStorage.removeItem("photoUrl");
   document.getElementById("courseImagePreview").src = "/assets/images/gallery.svg"
   document.getElementById("upload_widget").value = ""
}, false); 
