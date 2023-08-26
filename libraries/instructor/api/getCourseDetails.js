import { getAuth} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { collection, addDoc, query, getDocs, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js'
import { app, databaseURL as db } from '../../firebaseApi.js';
import courseStatues from '../../courseStatuses.js';
import { route } from '/../../../routers/router.js';


const auth = getAuth(app); 
var userEmail = sessionStorage.getItem('userEmail')

export async function getLectures()
{
    var questions = [];
    var questionId = sessionStorage.getItem("questionId")
//     const querySnapshot1 = collection(db,"questions").where("id","==",questionId).get().then(()=>{
// });

     var courseId = sessionStorage.getItem("courseId");
    var questionsData = document.getElementById("questionsData");
    questionsData.innerHTML = ""
    const Query = query(collection(db, "questions"), where("courseId", "==", courseId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        questions.push(doc.data())
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

async function getCourseDetails()
{
    var courseId = sessionStorage.getItem("courseId");

    const Query = query(collection(db, "courses"), where("courseId", "==", courseId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        document.getElementById("title").value  = doc.data().title;
        document.getElementById("shortDescription").value = doc.data().shortDescription;
        document.getElementById("Category").value = doc.data().name;
        document.getElementById("language").value = doc.data().language;
        document.getElementById("time").value = doc.data().time;
        document.getElementById("totalCourse").value =  doc.data().totalCourse;
        document.getElementById("price").value = doc.data().price;
        document.getElementById("DiscountPrice").value = doc.data().dicountPrice;
        document.getElementById("featureCourse").value = doc.data().featureCourse;
        document.getElementById("longDescription").value = doc.data().longDescription;

        document.getElementById("message").value = "You haven't submitted Course Additional Information";
       
        sessionStorage.setItem("levelId", doc.data().level)
        sessionStorage.setItem("categoryId", doc.data().categoryId)

    });
}

getCourseDetails();

export async function GetCourseCategoryById()
{
    var Categories = [];
    var data = document.getElementById("Category");
    var categoryId =  sessionStorage.getItem("categoryId")
    const Query = query(collection(db, "categories"), where("id", "==", categoryId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        Categories.push(doc.data())

        for(let i = 0; i < Categories.length; i++ )
        {
            var category = 
            `
                <option value="${Categories[i].id}">${Categories[i].name}</option>
            `
        }
        data.innerHTML += category;
    });
}

GetCourseCategoryById()
export async function GetCourseLevelById()
{
    var Categories = [];
    var data = document.getElementById("level");
    var levelId =  sessionStorage.getItem("levelId")
    const Query = query(collection(db, "levels"), where("id", "==", levelId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        Categories.push(doc.data())

        for(let i = 0; i < Categories.length; i++ )
        {
            var category = 
            `
                <option value="${Categories[i].id}">${Categories[i].name}</option>
            `
        }
        data.innerHTML += category;
    });
}

GetCourseLevelById()