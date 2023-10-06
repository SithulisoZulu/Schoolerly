import { collection, query, getDocs, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../libraries/firebaseApi.js";
import { checkCurrentUser } from '../libraries/Api/user/userApi.js'
import { user } from '../utils/Session.js'
import { getParameterByName } from '../security/getParameterByName.js';
import { createTopic, getTopicsByCourseId } from '../data/database/topic.js'


import  userRoles  from '../libraries/roles.js'

const email = user();

//Add Course Additional Information
export const addCourseQuestion = async (sanitizedData) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Instructor){
        throw new Error("You need an account to create a course")
    }
    await createTopic(sanitizedData)
}

//Get Topic By CourseId
export const GetTopicByCourseId = async (courseId) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Instructor){
        throw new Error("You need an account to create a course")
    }
    var questions = [];
    var questionsData = document.getElementById("questionsData");

    questionsData.innerHTML = ""
    const Query = query(collection(db, "topics"), where("courseId", "==", courseId));
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
};

