import { checkCurrentUser } from '../../libraries/Api/user/userApi.js'

const userEmail = sessionStorage.getItem("userEmail")

check(userEmail)
export async function check(userEmail) {
  try {
    const user = await checkCurrentUser(userEmail);
    if (user) {
      handleDOM(user);
      editProfileData(user)
    }
  } catch (error) {
    throw new Error("Error occurred while checking current user:", error);
  }
}

function handleDOM(user) {

  var avatar = document.getElementById("image");
  const userName = document.getElementById("user")
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

  if (avatar && user.photo) {
    avatar.src = user.photo;
  }
  if(userName && user.Name)
  {
    userName.textContent = user.Name +" " + user.Surname
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