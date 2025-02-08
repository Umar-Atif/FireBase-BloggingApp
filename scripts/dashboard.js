import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const userName = document.querySelector("#user-name");
const userProfile = document.querySelector("#user-profile");
const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener('click', event => {
    event.preventDefault()
    signOut(auth).then(() => {
        window.location = 'login.html'
    })
    .catch((error) => {
        Swal.fire({
            title: error,
            position: "top"
        });
    })
})

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        // console.log(uid);
        let users = await get()
        // console.log(users)
        userName.innerHTML = users.fullName
        userProfile.src = users.profileImage
    } else {
        window.location = "login.html"
    }
});

async function get() {
    let user = null
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        user = doc.data()
    });

    return user
}