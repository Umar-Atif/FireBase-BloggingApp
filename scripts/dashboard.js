import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where, orderBy, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const globalArr = [];

const userName = document.querySelector("#user-name");
const userProfile = document.querySelector("#user-profile");
const logoutBtn = document.querySelector("#logoutBtn");


logoutBtn.addEventListener('click', event => {
    event.preventDefault();
    signOut(auth).then(() => {
        window.location = 'login.html';
    }).catch((error) => {
        Swal.fire({
            title: error,
            position: "top"
        });
    });
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        let users = await getData();

        if (users.fullName) {
            userName.innerHTML = users.fullName;
        } else {
            userName.innerHTML = "No Name uploaded";
        }

        if (users.profileImage) {
            userProfile.src = users.profileImage;
        } else {
            userProfile.src = './assets/image-default.png';
        }

        await getBlog();
    } else {
        window.location = "login.html";
    }
});

async function getData() {
    let user = null;
    const q = query(collection(db, "usersInfo"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        user = doc.data();
    });
    return user;
}

const form = document.querySelector("#form");
const description = document.querySelector("#description");
const placeholder = document.querySelector("#placeholder");
const output = document.querySelector("#output");

form.addEventListener('submit', async event => {
    event.preventDefault();
    try {
        const user = await getData()

        const docRef = await addDoc(collection(db, "blog"), {
            description: description.value,
            placeholder: placeholder.value,
            uid: auth.currentUser.uid,
            date: Timestamp.fromDate(new Date()),
            profileImg: user.profileImage || './assets/image-default.png',
            fullName: user.fullName,
            email: user.email,
        });
        console.log(user)
        await getBlog();
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

async function getBlog() {
    const q = query(collection(db, 'blog'), where('uid', '==', auth.currentUser.uid), orderBy('date', "desc"));
    const querySnapshot = await getDocs(q);

    globalArr.length = 0;

    querySnapshot.forEach((doc) => {
        globalArr.push({ ...doc.data(), id: doc.id});
    });

    renderBlog();
}

function renderBlog() {
    output.innerHTML = '';

    globalArr.forEach(async (item) => {
        const user = await getData();
        const date = item.date.toDate().toLocaleDateString();

        output.innerHTML += `
        <div class="card2">
            <div class="a">
            <img width="100px" src="${user.profileImage || './assets/image-default.png'}" alt="User Profile">
            </div>
            <div class="b">
            <h3>${item.placeholder}</h3>
            <p><b>${user.fullName} - ${date}</b></p> 
            <p>${item.description}</p> 
            </div>
        </div>
        `;
    });

    placeholder.value = ''
    description.value = ''
}
