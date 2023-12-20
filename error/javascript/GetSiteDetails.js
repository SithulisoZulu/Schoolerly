import { collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";
import adminSettingsIds from "../../../libraries/adminSettingsIds.js";

console.log('con')
export async function getSiteSettings()
{
    // var siteName =  document.getElementById("siteName");

    const Query = query(collection(db, "adminSettings"), where("settingsId", "==", adminSettingsIds.siteSettingsId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        // siteName.value = doc.data().siteName
        console.log(doc.data().siteName);
        document.getElementById("name").innerHTML = doc.data().siteName
    });
}

getSiteSettings();