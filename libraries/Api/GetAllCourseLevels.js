import { collection, getDocs, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../firebaseApi.js";

export async function GetAllCategories()
{
    var Levels = [];
    var data = document.getElementById("level");
    const Query = query(collection(db, "levels"));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        Levels.push(doc.data())

        for(let i = 0; i < Levels.length; i++ )
        {
            var Level = 
            `
                <option value="${Levels[i].id}">${Levels[i].name}</option>
            `
        }
        data.innerHTML += Level;
    });
}

GetAllCategories();