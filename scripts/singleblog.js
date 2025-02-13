import { db } from "./firebaseconfig.js";
import { collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const userID = new URLSearchParams(window.location.search).get('userID');            
console.log(userID)                        

const output = document.querySelector("#output");
const output2 = document.querySelector("#output2");

const globalArr = []

const mainHeading = document.querySelector(".main-heading");
mainHeading.addEventListener('click', () => {
    window.location = 'index.html'
})

async function getBlog() {
    const q = query(collection(db, 'blog'), where('uid', '==', userID), orderBy('date', 'desc'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        globalArr.push(doc.data())  
    });
    console.log(globalArr)
    renderBlog()
}

function renderBlog() {
    output.innerHTML = ''
    const heading = document.querySelector(".heading")
    globalArr.map(async item => {
        const date = item.date.toDate().toLocaleDateString();
        output.innerHTML +=
        `<div class="card2">
            <div class="a">
            <img width="100px" src="${item.profileImg || './assets/image-default.png'}" alt="User Profile">
            </div>
            <div class="b">
            <h3>${item.placeholder}</h3>
            <p><b>${item.fullName} - ${date}</b></p> 
            <p>${item.description}</p>
        </div>
        `;
        // console.log(item.uid)
        heading.innerHTML = `All from ${item.fullName}`
        output2.innerHTML = `
        <h4>${item.email}</h4>
        <h3>${item.fullName}</h3>
        <img width="250px" src="${item.profileImg}" alt="User Profile">`
    })
}
getBlog()