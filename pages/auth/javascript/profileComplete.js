import { successMessages } from "../../../libraries/success/messages.js";

function populate()
{
    document.getElementById("message").innerHTML = successMessages.ProfileUpdated;
    document.getElementById("message2").innerHTML = successMessages.useProfile;
}

populate()