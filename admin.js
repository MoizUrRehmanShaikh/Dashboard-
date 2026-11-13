
import { firebaseConfig } from './firebase_config.js';

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const login = document.getElementById("loginBtn");

const email = document.getElementById("email");

const password = document.getElementById("password");

login.addEventListener("click", async function(e) {

    e.preventDefault();

    // Check Admin Credentials

    if (
        email.value !== "admin@admin.com" ||
        password.value !== "admin@123"
    ) {
        alert("Invalid Admin Email or Password!");
        return;
    }

    try {

        const result = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        alert("Admin Login Successful!");

        window.location.href = "./dashboard.html";

    }

    catch(error) {

        console.log(error);

        alert("Admin login failed!");

    }

});
