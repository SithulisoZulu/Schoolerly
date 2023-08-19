import {collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";

var userid
const userEmail = sessionStorage.getItem("userEmail")

var supportData = document.getElementById("supportData");
var length = document.getElementById("length");


async function checkCurrentUser(){
    var support = []
    const q = query(collection(db, "support"), orderBy("time"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => 
      {
        support.push(doc.data())
        for(let i = 0; i < support.length; i++)
        {
            var ticket = 
            `
                <!-- Ticket item START -->
                <div class="d-flex justify-content-between position-relative">
                    <div class="d-sm-flex">
                        <!-- Avatar -->
                        <div class="avatar avatar-md flex-shrink-0">
                            <img class="avatar-img rounded-circle" src="${support[i].photo}" width="40" height="40">
                        </div>
                        <!-- Info -->
                        <div class="ms-0 ms-sm-2 mt-2 mt-sm-0">
                            <h6 class="mb-0 fw-bolder text-capitalize"><a href="#" class="stretched-link text-white text-decoration-none">${support[i].requester}</a></h6>
                            <p class="mb-0">${support[i].Details}</p>
                            <span class="small">${support[i].time}</span>
                        </div>
                    </div>
                </div>
                <!-- Ticket item END -->

                <hr><!-- Divider -->
            `  
        } 
        
        supportData.innerHTML += ticket
        length.innerHTML = support.length
        console.log(support)
    });
}

checkCurrentUser()