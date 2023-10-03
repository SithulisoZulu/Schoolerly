import { collection, addDoc, Timestamp, updateDoc, doc, query, getDocs, where, orderBy } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import courseStatues from '../../courseStatuses.js';
import { databaseURL as db } from "../../firebaseApi.js";
import { route } from "../../../routers/router.js";
import { getParameterByName } from '../../../security/getParameterByName.js';

export async function addCourseData(sanitizedData, userEmail) {
    var feature;
    var discount

    if (sanitizedData.enableDiscount.checked === true) {
        discount = "Yes";
    } else {
        discount = "No";
    }

    if (sanitizedData.featureCourse.checked === true) {
        feature = "Yes";
    } else {
        feature = "No";
    }

    let id = crypto.randomUUID();

    await addDoc(collection(db, "courses"), {
        title: sanitizedData.title,
        shortDescription: sanitizedData.shortDescription,
        level: sanitizedData.level,
        categoryId: sanitizedData.Category,
        status: courseStatues.Applied,
        courseId: id,
        creationDate: Timestamp.fromDate(new Date()),
        language: sanitizedData.language,
        time: sanitizedData.time,
        featureCourse: feature,
        userEmail: userEmail,
        discount: sanitizedData.DiscountPrice,
        longDescription: sanitizedData.longDescription,
        price: sanitizedData.price,
        enrolled: 0

    }).then(docRef => {

        redirectToMediaUploadPage(id, docRef.id)
    }).catch((error) => {
        document.getElementById("error").classList.remove("visually-hidden");
        document.getElementById("error-message").textContent = Error.errorCreateCourse + " " + error;
    })
};


function redirectToMediaUploadPage(id, DocId) {
    try {
      var url = `${route.instructorUploadCourseMedia}?id=${encodeURIComponent(id)}&doc=${encodeURIComponent(DocId)}`;
      window.location.replace(url);
    } 
    catch (error) {
      console.log(error);
      throw error
    }
}

export async function update(){
    const photo = sessionStorage.getItem("photoUrl")
    var courseDocumentId = getParameterByName('doc');
    var id = getParameterByName('id');
    var video = sessionStorage.getItem("photoUrl")
    var fileName =sessionStorage.getItem("videoName")
    const updateRef = doc(db, "courses", courseDocumentId);
   var videoUrl = document.getElementById("videoUrl").value;

    // To update data
await updateDoc(updateRef, {
    photo: photo,
    video: video,
    fileName: fileName,
    videoUrl: videoUrl,
    id: id
});
redirectToAdditionalInfoPage(id, courseDocumentId)
}

function redirectToAdditionalInfoPage(id, DocId) {
    try {
      var url = `${route.instructorCourseAdditionalInformation}?id=${encodeURIComponent(id)}&doc=${encodeURIComponent(DocId)}`;
      window.location.replace(url);
    } 
    catch (error) {
      console.log(error);
      throw error
    }
}
export async function getAllCoursesByInstructorEmail(userEmail) {
    if (userEmail === null || userEmail === undefined) {
        throw new Error("Invalid userEmail");
    }
    const Query = query(collection(db, "courses"), where("userEmail", "==", userEmail));
    const courses = await getDocs(Query);
    return courses
}

export async function getCourseById(courseId)
{
    const Query = query(collection(db, "courses"), where("courseId", "==", courseId));
    const course = await getDocs(Query);
    return course
}

export async function AddQuestion()
{
    var userEmail = sessionStorage.getItem('userEmail')
    var question  = document.getElementById("question").value;
    var answer  = document.getElementById("answer").value;
    var id = getParameterByName('doc');
    let questionId = crypto.randomUUID();


  const docRef = await addDoc(collection(db, "questions"), {
    id: questionId,
    question: question,
    answer: answer,
    courseId: id,
    userEmail: userEmail
  }).then(docRef => {
    sessionStorage.setItem("questionId", questionId)
    
getLectures();
})
.catch((error) => {
    // document.getElementById("error").classList.remove("visually-hidden")
    // document.getElementById("error-message").innerHTML = Error.errorCreateCourse  + " " + error
    console.log(error)
})
}

export async function getLectures()
{
    var questions = [];
    let id = crypto.randomUUID();
    var courseId  = getParameterByName('doc');

    console.log("lectureId " + " " + courseId)
    var questionsData = document.getElementById("questionsData");

    questionsData.innerHTML = ""
    const Query = query(collection(db, "questions"), where("courseId", "==", courseId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        questions.push(doc.data())
      console.log("Lecture " + " " + doc.data())
        for(let i = 0; i < questions.length; i++ )
        {
          var question = 
          `
          <div class="col-12">
          <div class="bg-dark-subtle p-4 border rounded">
              <!-- Item 2 -->
              <div class="d-sm-flex justify-content-sm-between align-items-center mb-2">
                  <!-- Question -->
                  <h6 class="mb-0 fw-bolder text-white">${questions[i].question}</h6>
                  <!-- Button -->
                  <div class="align-middle">
                      <a data-bs-toggle="modal" data-bs-target="#updateQuestion" class="btn btn-sm bg-success bg-opacity-10 text-success btn-round me-1 mb-1 mb-md-0"><i class="far fa-fw fa-edit"></i></a>
                      <button class="btn btn-sm bg-danger  bg-opacity-10 text-danger btn-round mb-0"><i class="fas fa-fw fa-times"></i></button>
                  </div>
              </div>
              <hr>
              <!-- Content -->
              <p class="text-white-50">${questions[i].answer}.</p>
          </div>	
      </div>
          `
        }
        questionsData.innerHTML += question;
    });
}
