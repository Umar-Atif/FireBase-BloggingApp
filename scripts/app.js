import { db } from "./firebaseconfig.js";
import { collection, getDocs, query, orderBy, where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const output = document.querySelector("#output");

const globalArr = [];

async function getBlog() {
    const q = query(collection(db, 'blog'), orderBy('date', 'desc'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        globalArr.push(doc.data())
    });
    console.log(globalArr)
    renderBlog()
    return globalArr
}

function renderBlog() {
    output.innerHTML = '',
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
            <a target="_blank" href="singleblog.html?userID=${item.uid}" style="color: #7b00ff; text-decoration: none  ;">see all from this user</a>
            </div>
        </div>
        `;
        // console.log(item.uid)
    })
    console.log('Globar Array Worked')
}
getBlog()