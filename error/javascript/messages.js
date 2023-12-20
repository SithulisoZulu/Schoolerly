import { ErrorMessage } from "../../libraries/errors/messages.js";

var account = document.getElementById("account")
account.innerHTML =  ErrorMessage.AccountDoesNotExit

var  pleaseCheck = document.getElementById("pleaseCheck").innerHTML = ErrorMessage.EmailAndPassword