import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, deleteUser } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { app, databaseURL as db } from '../../libraries/firebaseApi.js';
import { checkCurrentUser } from '../../libraries/Api/user/userApi.js';
import * as loadingHandler from '../../libraries/loading.js';
import { route } from "../../routers/router.js";


const deactivateUser = document.getElementById('delectAccount').addEventListener('click', async (e) => {
    const auth = getAuth(app);
    const loggedInUser = auth.currentUser;
    const email = sessionStorage.getItem("userEmail");
    try {
        const user = await checkCurrentUser(email)
        if(!user)
        {
          return
        }
        loadingHandler.isLoadingDelete()
        deleteAccount (user.id)
        loadingHandler.isNotLoadingUDelete()
    } catch (error) {
      throw error
    }
  });


async function deleteAccount (id)
{
    await deleteDoc(doc(db, "users", id));

    window.location.replace(route.loginPageUrl)
}

window.confirm()