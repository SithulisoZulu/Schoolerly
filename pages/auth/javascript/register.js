import { doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";
import { route } from "../../../routers/router.js";


async function update(){

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
});
    location.replace(route.CompletedProfilePageUrl)
}


const updatePost = document.getElementById('submit').addEventListener('click', (e)=>{
    update()
})