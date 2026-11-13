import { firebaseConfig } from './config/firebase_Config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getFirestore, collection, where, getDocs, query, doc, setDoc, serverTimestamp,deleteDoc,updateDoc }
 from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";



const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const catName = document.getElementById("catName")
const catBtn = document.getElementById("catBtn")
const uptBtn = document.getElementById("uptBtn")
let cat = document.getElementById("cat") 


let cattotal=document.getElementById("catotal")
let loading = document.getElementById("loading")

catBtn.addEventListener("click", addNewCategory)

let seletedItem =null;


async function addNewCategory() {
    const CategoryRef = doc(collection(db, "Category"));
    await setDoc(CategoryRef, {
        categoryName: catName.value,
        categoryKey: CategoryRef.id,
        createdAt: serverTimestamp()
    })
   
    getAllCategory()

}

async function getAllCategory() {
    const CategoryRef = collection(db, "Category");
    const data = await getDocs(CategoryRef)
    console.log(data.docs)
cattotal.innerText=data.docs.length 

    loading.style.display = "none"
    cat.innerHTML = `
     <tr>
                    <th>S.no</th>
                    <th>Category Name</th>

                    <th>Status</th>
                </tr>
    `
    var index = 1;
    for (var value of data.docs) {
        console.log(value.data())
        cat.innerHTML += `
         <tr>
                    <th>${index}</th>
                    <th>${value.data()["categoryName"]}</th>
<th>
                        <button id=${value.data()["categoryKey"]} class='btn btn-success'edit-Btn onclick='editCategory(this)'>Edit</button>    
                        <button id=${value.data()["categoryKey"]} class='btn btn-danger delete-Btn' onclick='DeleteDoc(this)' >Delete</button>    

                    </th>
                </tr>
        `
        index+=1;
// const deleteBtn = cat.querySelector('.delete-btn');
// console.log(deleteBtn)
// deleteBtn.addEventListener("click",function(){
//    DeleteDoc(this) 
// })


}

}

function editCategory(){
    catBtn.classList.add("d-none")
    uptBtn.classList.remove("d-none")
    uptBtn.addEventListener("click",updateCategory)
    seletedItem=e
console.log(e.id)
var categoryName = e.parentNode.parentNode.children[1].innerText
catName.value=categoryName

}



async function updateCategory(){
console.log(seletedItem.id)

const CategoryRef = doc(db,"category",seletedItem.id);
await updateDoc(CategoryRef,{
    categoryName:catName.value
})
.then((val)=>{
    alert("updated item")
   getAllCategory()
    catBtn.classList.remove("d-none")
    catName.value=""
})

async function DeleteDoc(e){
    // console.log(e.parentNode.parentNode.remove())

    const CategoryReg=doc(db,"category",e.id)
  await  deleteDoc(CategoryReg)
    .then((val)=>{
        alert("delete Item")
         e.parentNode.parentNode.remove()
         getAllCategory()
    })
    .catch((e)=>{
        console.log(e)
    })
}

window.DeleteDoc=DeleteDoc
window.editcategory= editcategory
// window.DeleteDoc=DeleteDoc

getAllCategory()




}