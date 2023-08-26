import { collection, getDocs, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../firebaseApi.js";

export async function GetAllCategories()
{
    var Categories = [];
    var data = document.getElementById("Category");
    const Query = query(collection(db, "categories"));
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

GetAllCategories();