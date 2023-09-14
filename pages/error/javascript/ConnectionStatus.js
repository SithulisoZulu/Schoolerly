import { ErrorMessage } from "../../../libraries/errors/messages.js";

const page = sessionStorage.getItem("page")

document.getElementById("offline").innerHTML =  ErrorMessage.offline

document.getElementById("pleaseCheck").innerHTML = ErrorMessage.check


const submit = document.getElementById('id').addEventListener("click", (e) =>
{
    if(page)
    {

    }
});