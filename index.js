/*import { initializeApp } from "./firebase-app.js"

const appSettings = {
    databaseURL: "https://toyshoppingcart-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)

console.log(app)*/


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function() {              //event listener listens to what useer does to produce output.
    let inputValue = inputFieldEl.value                         //set variable = id.value(from id) to show in console.log
    
    console.log(inputValue)
})