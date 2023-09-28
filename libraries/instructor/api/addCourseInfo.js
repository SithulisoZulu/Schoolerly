import { getAuth} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { collection, addDoc, query, getDocs, where, doc, updateDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js'
import { app, databaseURL as db } from '../../firebaseApi.js';
import { route } from '/../../../routers/router.js';
import notification from  '../../systemNotifications.js';


const auth = getAuth(app); 
var userEmail = sessionStorage.getItem('userEmail')









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
    Redirect()
    sendMail()
    notifications()
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

async function notifications()
{
  const docRef = await addDoc(collection(db, "usernotifications"), {
    id: notification.id,
    from: notification.from,
    message: notification.message,
    photo: notification.photo,
    email: userEmail,
    time: Timestamp.fromDate(new Date()),
  }).catch((error) => {
  console.log(error)
  }) 
}