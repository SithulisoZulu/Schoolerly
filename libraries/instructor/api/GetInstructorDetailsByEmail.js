import { collection, addDoc, query, getDocs, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js'
import { databaseURL as db } from '../../firebaseApi.js';

var userEmail = sessionStorage.getItem('userEmail');

console.log(userEmail)
async function getDetails()
{
    const Query = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        console.log(doc.data())
        document.getElementById("photo").src = doc.data().photo

        document.getElementById("name").value = doc.data().Name;
        document.getElementById("surname").value = doc.data().Surname;
        document.getElementById("username").value = doc.data().DisplayName;
        document.getElementById("email").value = doc.data().email;
        document.getElementById("userEmail").innerHTML = doc.data().email;
        document.getElementById("number").value = doc.data().Contact;
        document.getElementById("address").value = doc.data().Address;
        document.getElementById("select").value = doc.data().Role  
        document.getElementById("about").value = doc.data().About  

    });
}
getDetails()

const submit = document.getElementById('submit').addEventListener("click", (e) =>
{ 
    addSocials();
});
async function addSocials()
{
    let id = crypto.randomUUID();
    const facebook = document.getElementById('facebook').value;
    const twitter = document.getElementById('twitter').value;
    const instagram = document.getElementById('instagram').value;
    const youtube = document.getElementById('youtube').value;
  
    const docRef = await addDoc(collection(db, "userSocials"), {
        id: id,
        Facebook: facebook,
        Twitter: twitter,
        Instagram: instagram,
        YouTube: youtube,
        userEmail: userEmail
    });
    getSocials();
}

async function getSocials()
{
    var socials = []
    const q = query(collection(db, "userSocials"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => 
      {
        socials.push(doc.data())
       document.getElementById('facebook').value = doc.data().Facebook;
        document.getElementById('twitter').value = doc.data().Twitter;
        document.getElementById('instagram').value = doc.data().Instagram;
        document.getElementById('youtube').value = doc.data().YouTube;

        console.log(socials)

     var userSocialsId = doc.id

     sessionStorage.setItem("userSocialsId", userSocialsId)
    });

    if(socials.length > 0)
    {
        document.getElementById("update").classList.remove("visually-hidden");
        document.getElementById("submit").classList.add("visually-hidden");
    }
}
getSocials()


const updates = document.getElementById('update').addEventListener("click", (e) =>
{
    update()
});
async function update(){

    var userSocialsId  =  sessionStorage.getItem("userSocialsId")
    const facebook = document.getElementById('facebook').value;
    const twitter = document.getElementById('twitter').value;
    const instagram = document.getElementById('instagram').value;
    const youtube = document.getElementById('youtube').value;

    const updateRef = doc(db, "userSocials", userSocialsId);
    // To update data
  await updateDoc(updateRef, {
    Facebook: facebook,
    Twitter: twitter,
    Instagram: instagram,
    YouTube: youtube,
  });

}