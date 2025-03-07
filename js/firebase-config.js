import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB7Ta7T_dDgvx3r26IdKKt6e-7b0hOekSI",
    authDomain: "examen1progra4-a63fb.firebaseapp.com",
    projectId: "examen1progra4-a63fb",
    storageBucket: "examen1progra4-a63fb.firebasestorage.app",
    messagingSenderId: "264781726632",
    appId: "1:264781726632:web:fdfc46fc1adfde77dbd39d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
