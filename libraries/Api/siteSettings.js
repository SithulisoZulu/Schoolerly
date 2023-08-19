import { collection, getDocs, where, query, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../firebaseApi.js";
import adminSettingsIds from "../adminSettingsIds.js";
import { successMessages } from "../success/messages.js";
console.log('con')
export async function getSiteSettings()
{
    var siteName =  document.getElementById("siteName");
    var siteCopyrights = document.getElementById("siteCopyrights");
    var siteEmail = document.getElementById("siteEmail");
    var contactPhone =   document.getElementById("contactPhone");
    var siteDescription =document.getElementById("siteDescription") ;
    var contactPhone =document.getElementById("contactPhone");
    var supportEmail =document.getElementById("supportEmail");
    var supportAddress = document.getElementById("supportAddress")
    var enable =document.getElementById("enable");
    var disable =document.getElementById("disable");
    var onRequest =document.getElementById("onRequest");

    // await fetch(db + "sites/" + userEmail).then((response) => response.json())

    const Query = query(collection(db, "adminSettings"), where("settingsId", "==", adminSettingsIds.siteSettingsId));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        siteName.value = doc.data().siteName
        siteCopyrights.value = doc.data().siteCopyrights;
        siteEmail.value = doc.data().siteEmail;
        siteDescription.value = doc.data().SiteDescription;
        contactPhone.value = doc.data().ContactPhone
        supportEmail.value = doc.data().SupportEmail;
        supportAddress.value = doc.data().supportAddress;

        // if (doc.id == 'AllowRegistration' && !doc.exists()){}

        if(doc.data().AllowRegistration == "enable")
        {
            enable.checked = true
        }
        else if(doc.data().AllowRegistration == "disable")
        {
            disable.checked= true
        }
        else if(doc.data().AllowRegistration == "onRequest")
        {
            onRequest.checked = true
        }
    });
}

getSiteSettings();

var update =document.getElementById("update").addEventListener("click", (e) => {
    updateSiteSettings();
});

async function updateSiteSettings()
{
    const updateRef = doc(db, "adminSettings", adminSettingsIds.siteSettingsId);
    
    var siteName =  document.getElementById("siteName").value;
    var siteCopyrights = document.getElementById("siteCopyrights").value;
    var siteEmail = document.getElementById("siteEmail").value;
    var contactPhone =   document.getElementById("contactPhone").value;
    var siteDescription =document.getElementById("siteDescription").value;
    var contactPhone =document.getElementById("contactPhone").value;
    var supportEmail =document.getElementById("supportEmail").value;
    var supportAddress = document.getElementById("supportAddress").value;
    var enable =document.getElementById("enable");
    var disable =document.getElementById("disable");
    var onRequest =document.getElementById("onRequest");

    var AllowRegistration ;

    if(enable.checked)
    {
        AllowRegistration = 'enable'
    }
    else if(disable.checked)
    {
        AllowRegistration = 'disable'
    }
    else if (onRequest.checked){
        AllowRegistration ='onRequest'
    }

    // To update data
await updateDoc(updateRef, {
    siteName: siteName,
    siteCopyrights: siteCopyrights,
    siteEmail: siteEmail,
    contactPhone: contactPhone,
    siteDescription: siteDescription,
    supportAddress: supportAddress,
    supportEmail: supportEmail,
}).then((e) =>{
    document.getElementById("alert-success").classList.remove("visually-hidden")
    document.getElementById("message").innerHTML = successMessages.siteSettingsUpdated
    getSiteSettings()
});
}