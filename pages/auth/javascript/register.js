import { doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";
import { route } from "../../../routers/router.js";

const userId = document.getElementById('userId').value .trim()
const updateRef = doc(db, "user", userId);

async function update(){
const name = document.getElementById('name').value;
const surname = document.getElementById('surname').value;
const contact = document.getElementById('contact').value;
// const closingDate = document.getElementById('date').value;
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

console.log(userId)