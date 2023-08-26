import { ErrorMessage } from "../../../libraries/errors/messages.js";
import { route } from "../../../routers/router.js";

document.getElementById("offline").innerHTML =  ErrorMessage.offline

document.getElementById("pleaseCheck").innerHTML = ErrorMessage.check


var page = sessionStorage.getItem("page")
var btn = document.getElementById("btn")
if(page != "login")
{
    btn.innerText = "go back" 
    btn.href = route.adminHomePageUrl
}

console.log(btn)