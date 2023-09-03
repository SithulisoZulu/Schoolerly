import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";
import { route } from "../../../routers/router.js";

// export const addNewUser = async (user) =>  await fetch(`${db}/users/${user}`,{
//     });

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dpnz1b1ud', 
    uploadPreset: 'coursesPhotos'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info);
        var photoUrl = result.info.url 

        sessionStorage.setItem("photoUrl", photoUrl)

        document.getElementById("upload_widget").value = result.info.original_filename;
      }
    }
    
  )

    
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
  }, false);

async function update(){
    const photoUrl = sessionStorage.getItem("photoUrl")
    const userId = document.getElementById('userId').value.trim()
    const updateRef = doc(db, "users", userId);
    
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const select = document.getElementById('select').value;
    const address = document.getElementById('address').value;

    // To update data
  await updateDoc(updateRef, {
      Name: name,
      Surname: surname,
      Contact: contact,
      Date: '',
      email: email,
      Role: select,
      Address: address,
      photo: photoUrl
  });
    location.replace(route.CompletedProfilePageUrl)
}


const updatePost = document.getElementById('submit').addEventListener('click', (e)=>{
    update()
})