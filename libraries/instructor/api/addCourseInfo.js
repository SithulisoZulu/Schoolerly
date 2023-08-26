import { getAuth} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { collection, addDoc, query, getDocs, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js'
import { app, databaseURL as db } from '../../firebaseApi.js';
import courseStatues from '../../courseStatuses.js';
import { route } from '/../../../routers/router.js';


const auth = getAuth(app); 
var userEmail = sessionStorage.getItem('userEmail')


const saveTopic = document.getElementById('saveTopic').addEventListener("click", (e) =>
{  
    if(navigator.onLine)
    {
        console.log("clicked")
        question()
    }
    else
    {
      sessionStorage.setItem("page", "login")
      location.replace(route.offlinePageUrl);
    }

});


async function question()
{
    var userEmail = sessionStorage.getItem('userEmail')
    var question  = document.getElementById("question").value;
    var answer  = document.getElementById("answer").value;
    var courseId = sessionStorage.getItem("courseId");
    let id = crypto.randomUUID();

  const docRef = await addDoc(collection(db, "questions"), {
    id: id,
    question: question,
    answer: answer,
    courseId: courseId,
    userEmail: userEmail
  }).then(docRef => {
    sessionStorage.setItem("questionId", id)
    
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
    var questionId = sessionStorage.getItem("questionId")
//     const querySnapshot1 = collection(db,"questions").where("id","==",questionId).get().then(()=>{
// });

     var courseId = sessionStorage.getItem("courseId");
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

getLectures();


const submit = document.getElementById('submit').addEventListener("click", (e) =>
{  
    if(navigator.onLine)
    {
        console.log("clicked")
        updateCourse()
    }
    else
    {
      sessionStorage.setItem("page", "login")
      location.replace(route.offlinePageUrl);
    }

});


async function updateCourse()
{
    const courseDocumentId = sessionStorage.getItem("courseDocumentId")
    var message = document.getElementById("message").value;
    var confirmation = document.getElementById("confirmation");

    var conf;
    if(confirmation.checked)
    {
        conf = "Yes"
    }
    else{
        conf = "No"
    }

    const updateRef = doc(db, "courses", courseDocumentId);
    // To update data
    await updateDoc(updateRef, {
        message: message,
        confirmation: conf
    }).then(() =>
    {
        sendMail()
        Redirect()
    });
}

function Redirect()
{
  location.replace(route.courseAdded)
}



function sendMail(){
    var params = {
      email: userEmail
    };
    const serviceId = "service_54pvnqm";
    const templeteId = "template_rs8d73a";
  
  emailjs.send(serviceId,templeteId,params)
  .then(
    res => {
        console.log(res)
    }
  ).catch((err)=>{
    console.log(err)
    });
  }