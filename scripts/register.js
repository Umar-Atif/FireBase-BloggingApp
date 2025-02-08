import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";

const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const fullName = document.querySelector('#fullName');

let picURL = ''

let myWidget = cloudinary.createUploadWidget({
    cloudName: 'dnqqknxgz', 
    uploadPreset: 'Umar-Batch-12'
}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        picURL = result.info.secure_url
      }
    }
  )
  
document.getElementById("upload_widget").addEventListener("click", function(event){
    event.preventDefault()
    myWidget.open();
}
, false);

form.addEventListener('submit', event => {
    event.preventDefault()

    // console.log(email.value)
    // console.log(password.value)
    // console.log(fullName.value)

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        // Swal.fire({
        //     title: "Registration successful! Welcome aboard!",
        //     position: "top"
        // }); 
        window.location = 'dashboard.html'

        try {
            const docRef = await addDoc(collection(db, "users"), {
                fullName: fullName.value,
                email: email.value,
                profileImage: picURL,
                uid: user.uid                                                                           
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    })
    .catch((error) => {
        const errorMessage = error.message;
        // console.log(errorMessage);
        Swal.fire({
            title: "Registration failed. Please try again.",
            position: "top"
        });          
    })
    .finally(() => {
        email.value = '';
        password.value = '';
        fullName.value = '';
    });
})