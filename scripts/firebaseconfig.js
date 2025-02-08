import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUvc2uqvIYRUy6bdbTO7TP06mZ5nFLdJg",
    authDomain: "firebas-authentication-u3.firebaseapp.com",
    projectId: "firebas-authentication-u3",
    storageBucket: "firebas-authentication-u3.firebasestorage.app",
    messagingSenderId: "968316465557",
    appId: "1:968316465557:web:eed10f0cd7d3c23f52469c",
    measurementId: "G-DCQ31NWNPE"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);