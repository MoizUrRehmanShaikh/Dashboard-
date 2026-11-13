import { firebaseConfig } from './config/firebase_Config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getFirestore, collection, where, getDocs, query } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
let users = document.getElementById("users");
let category = document.getElementById("category");

async function getAllStats() {

    const userRef = collection(db, "users");
    const data = await getDocs(userRef);

    const catageryRef = collection(db,"Category")
    const categoryData = await getDocs(catageryRef)

    
    users.innerText = data.docs.length;
    catagery.innerHTML = categoryData.docs.length;

    console.log(data.docs);

    for (var value of data.docs) {
        console.log(value.data());
    }
}


async function getAllStatsCategory(){
    const userRef = collection(db, "Category")
    const data = await getDocs(userRef)
    console.log(data.docs)
    category.innerText=data.length>10 ? "10+": data .docs.length
    for (var value of data.docs){
        console.log(value.data())
    }
}






getAllStats()
getAllStatsCategory()
