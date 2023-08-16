import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyD4TJ6cXs0i0viuY-2Y_LZznJA9Evh6-jY",
  authDomain: "schoolerly-1d189.firebaseapp.com",
  databaseURL: "https://schoolerly-1d189-default-rtdb.firebaseio.com",
  projectId: "schoolerly-1d189",
  storageBucket: "schoolerly-1d189.appspot.com",
  messagingSenderId: "193080253000",
  appId: "1:193080253000:web:17f3d09bd4d79b66dd567d"
};

export const app = initializeApp(firebaseConfig);
export const databaseURL = getFirestore(app);