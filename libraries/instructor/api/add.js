import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { collection, addDoc, Timestamp, getDocs, where, query, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { app, databaseURL as db } from "../../../libraries/firebaseApi.js";
import { successMessages as success} from '../../../libraries/success/messages.js';
import { ErrorMessage as Error } from "../../../libraries/errors/messages.js";
import userRoles from '../../../libraries/roles.js';
import { route } from '../../../routers/router.js';

const auth = getAuth(app); 
var userEmail = sessionStorage.getItem('userEmail')


   
const addlecture = document.getElementById("add").addEventListener("click", (e) =>
{  
    if(navigator.onLine)
    {
      addLecture()
    }
    else
    {
      sessionStorage.setItem("page", "login")
      location.replace(route.offlinePageUrl);
    }

});
async function addLecture()
{
  var courseId = sessionStorage.getItem("courseId")


  console.log(courseId)
  var lecture = document.getElementById("lecture").value
  var id =  crypto.randomUUID();
  const docRef = await addDoc(collection(db, "lectures"), {
    id: id,
    lecture: lecture,
    topics: [],
    courseId: courseId,
    userEmail: userEmail,
  }).then(docRef => {
    sessionStorage.setItem("lectureDocId", docRef.id)
    sessionStorage.setItem("lectureId", id)
    getLectures();
})
.catch((error) => {
    // document.getElementById("error").classList.remove("visually-hidden")
    // document.getElementById("error-message").innerHTML = Error.errorCreateCourse  + " " + error
    console.log(error)
})
}

 
const saveTopic = document.getElementById("saveTopic").addEventListener("click", (e) =>
{  
    if(navigator.onLine)
    {
        addTopicData()
    }
    else
    {
      sessionStorage.setItem("page", "login")
      location.replace(route.offlinePageUrl);
    }

});

async function update(){
    var lectureId = sessionStorage.getItem("lectureDocId")
    var topic = document.getElementById("Topic").value
    const updateRef = doc(db, "lectures", lectureId);
    // To update data
await updateDoc(updateRef, {
    topics: [topic]
});
    // location.replace(route.instructorCourseAdditionalInformation)
}


async function addTopicData()
{
    var courseId = sessionStorage.getItem("courseId")
    var lectureId = sessionStorage.getItem("lecture")
    var topic = document.getElementById("Topic").value
    var videoLink = document.getElementById("videoLink").value
    var description = document.getElementById("description").value

    var id = crypto.randomUUID();

    const docRef = await addDoc(collection(db, "topics"), {
      id: id,
      topic: topic,
      videoLink:  videoLink,
      description:description,  
      userEmail: userEmail,
      courseId: courseId,
      lectureId: lectureId
    }).then(docRef => {
      sessionStorage.setItem("topicId", id)
      getTopics();
      update()
  })
  .catch((error) => {
      // document.getElementById("error").classList.remove("visually-hidden")
      // document.getElementById("error-message").innerHTML = Error.errorCreateCourse  + " " + error
      console.log(error)
  })
}

export async function getLectures()
{
    var lectures = [];
    var lectureId = sessionStorage.getItem("lectureId")
    console.log("lectureId " + " " + lectureId)
    var lectureHead = document.getElementById("lecture-head");
    const Query = query(collection(db, "lectures"), where("id", "==", lectureId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
      lectures.push(doc.data())
      console.log("Lecture " + " " + doc.data())
        for(let i = 0; i < lectures.length; i++ )
        {
          var lecture = 
          `
            <h6 class="accordion-header font-base border-0 " >
              <button class="accordion-button fw-bold rounded d-inline-block border-0 collapsed d-block pe-5 bg-dark-subtle text-white  mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#${lectures[i].id}" aria-expanded="false" aria-controls="collapse-1">
                  ${lectures[i].lecture}
              </button>
            </h6>

            <div id="${lectures[i].id}" class="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#accordionExample2">
              <!-- Topic START -->
              <div class="accordion-body mt-3" id="topic">

              </div>
              <!-- Topic END -->
              
          <!-- Add topic -->
          <a href="#" class="btn btn-sm bg-black mb-3" data-bs-toggle="modal" data-bs-target="#addTopic"><i class="bi bi-plus-circle me-2"></i>Add topic</a>
            </div>
          `
        }
        lectureHead.innerHTML += lecture;
    });
}

getLectures();



export async function getTopics()
{
    var topics = [];
    var topicId = sessionStorage.getItem("topicId")
    console.log("Topic Id" + " " + topicId)
    var topic = document.getElementById("topic");
    const Query = query(collection(db, "lectures"), where("id", "==", topicId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
      topics.push(doc.data())
      console.log("Topics : "  + "" + doc.data())
        for(let i = 0; i < topics.length; i++ )
        {
          var lecture = 
          `
          <!-- Video item START -->
          <div class="d-flex justify-content-between align-items-center">
              <div class="position-relative">
                  <a href="${topics[i].videoLink}" target="_blank"  class="btn bg-danger bg-opacity-10 text-danger btn-round btn-sm mb-0 stretched-link position-static"><i class="fas fa-play"></i></a>
                  <span class="ms-2 mb-0 h6 fw-light">${topics[i].topic}</span>
              </div>
              <!-- Edit and cancel button -->
              <div>
                  <a href="#" class="btn btn-sm bg-success bg-opacity-10 text-success btn-round me-1 mb-1 mb-md-0"><i class="far fa-fw fa-edit"></i></a>
                  <button class="btn btn-sm bg-danger bg-opacity-10 text-danger btn-round mb-0 bg-danger-hover"><i class="fas fa-fw fa-times"></i></button>
              </div>
          </div>
          <!-- Divider -->
          <hr>
          `
        }
        topic.innerHTML += lecture;
    });
}

getTopics();