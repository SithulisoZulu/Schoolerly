import { checkCurrentUser, getSocials } from '../../libraries/Api/user/userApi.js'
import { user } from '../../utils/Session.js';
import AuthProviders from '../auth/AuthProviders.js';

const userEmail = user()

check(userEmail)
export async function check(userEmail) {
  try {
    const user = await checkCurrentUser(userEmail);
    if (user) {
      handleDOM(user);
      editProfileData(user)
      checkProvider(user)
      populateSocials(user)
    }
  } catch (error) {
    throw new Error("Error occurred while checking current user:", error);
  }
}

function handleDOM(user) {

  var avatar = document.getElementById("image");
  var navUserPic = document.getElementById("navUserPic");
  var navUserBoxPic = document.getElementById("navUserBoxPic");

  const userName = document.getElementById("user")
  const userBoxUser = document.getElementById("userBoxUser")
  const userBoxEmail = document.getElementById("userBoxEmail")
  let elements = [
    { id: 'username', property: 'Name' },
    { id: 'userRole', property: 'Role' },
    { id: 'username2', property: 'Name' },
    { id: 'userRole2', property: 'Role' }
  ];

  elements.forEach(element => {
    let elementHolder = document.getElementById(element.id);
    if (elementHolder && user[element.property]) {
      elementHolder.textContent = user[element.property];
    }
  });

  if (avatar && user.photo && navUserPic && navUserBoxPic) {
    avatar.src = user.photo;
    navUserPic.src = user.photo;
    navUserBoxPic.src = user.photo;
  }
  if(userName && user.Name && userBoxUser && userBoxEmail)
  {
    userName.textContent = user.Name +" " + user.Surname
    userBoxUser.textContent = user.Name +" " + user.Surname
    userBoxEmail.textContent = user.email
  }
}

async function editProfileData(user) {
  // Suggestion 1: Add a check for null or undefined user
  if (!user) {
    return;
  }

  var avatar = document.getElementById("photo");
  const email = document.getElementById("userEmail")
  const userName = document.getElementById("user")
  let elements = [
    { id: 'name', property: 'Name' },
    { id: 'surname', property: 'Surname' },
    { id: 'email', property: 'email' },
    { id: 'number', property: 'Contact' },
    { id: 'address', property: 'Address' },
    { id: 'photo', property: 'photo' },
    { id: 'select', property: 'Role' },
    { id: 'user', property: 'Name' },
    { id: 'about', property: 'About' },
    { id: 'PasswordMail', property: 'email' }
  ];

  elements.forEach(element => {
    let elementHolder = document.getElementById(element.id);
    if (elementHolder && user[element.property]) {
      elementHolder.value = user[element.property];
    }
  });

  if(email && user.email) {
    email.textContent = user.email
  }
  if(userName && user.Name)
  {
    userName.textContent = user.Name +" " + user.Surname
  }
  if (avatar && user.photo) {
    avatar.src = user.photo;
  }
}

async function checkProvider(user) {
  if (!user || !user.provider) {
    return;
  }

  const provider = user.provider;
  const googleAuthProvider = document.getElementById('google');
  const faceAuthProvider = document.getElementById('facebook');
  const emailPasswordAuthProvider = document.getElementById('emailPassword');

  switch (provider) {
    case AuthProviders.GoogleAuthProvider:
      if (googleAuthProvider) {
        googleAuthProvider.classList.remove("visually-hidden");
      }
      break;
    case AuthProviders.FacebookAuthProvider:
      if (faceAuthProvider) {
        faceAuthProvider.classList.remove("visually-hidden");
      }
      break;
    case AuthProviders.createUserWithEmailAndPassword:
      if (emailPasswordAuthProvider) {
        emailPasswordAuthProvider.classList.remove("visually-hidden");
      }
      break;
  }
}

export async function populateSocials(user) {
  const userEmail = user.email
  try {
    const socials = await getSocials(userEmail);
    if(socials)
    {
      handleSocials(socials);
      return socials
    }
  } catch (error) {
    throw error;
  }
}

function handleSocials(socials) {
  try{
    
  let elements = [
    { id: 'facebookId', property: 'facebook' },
    { id: 'twitter', property: 'twitter' },
    { id: 'instagram', property: 'instagram' },
    { id: 'youtube', property: 'youtube' }
  ];

  elements.forEach(element => {
    let elementHolder = document.getElementById(element.id);
    if (elementHolder && socials[element.property]) {
      elementHolder.value = socials[element.property];
    }
  });

  var addSocials = document.getElementById("addSocials");
  var update = document.getElementById("update");
  if(addSocials)
  {
    addSocials.classList.add("visually-hidden")
  }
  if(update)
  {
    update.classList.remove("visually-hidden")
  }

  } catch (error) {
    console.log(error)
  }
}