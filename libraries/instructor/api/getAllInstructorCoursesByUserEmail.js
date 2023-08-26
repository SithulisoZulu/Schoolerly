import { getAuth} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { collection, addDoc, query, getDocs, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js'
import { app, databaseURL as db } from '../../firebaseApi.js';


async function getAllInstructorCoursesByInstructorEmail()
{
    var userEmail = sessionStorage.getItem("userEmail");
    var courses = []
    const Query = query(collection(db, "courses"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        courses.push(doc.data())
    });
    document.getElementById("courses").innerHTML = courses.length
}

getAllInstructorCoursesByInstructorEmail()