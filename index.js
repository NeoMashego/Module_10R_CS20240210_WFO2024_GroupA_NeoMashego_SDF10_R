import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-5b250-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {              //event listener listens to what useer does to produce output.
    let inputValue = inputFieldEl.value                         //set variable = id.value(from id) to show in console.log
    
    push(shoppingListInDB, inputValue)

   clearInputFieldEl()
})

function addItemToShoppingListEl(itemValue) {
    let newEl = document.createElement("li")                //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    newEl.textContent = itemValue
    shoppingListEl.append = newEl
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

onValue(shoppingListInDB, function(snapshot) {
    let shoppingListArray = Object.entries(snapshot.val())                     //console.log(shoppingListArray)

    clearShoppingListEl()

    for (let s = 1; s < shoppingListArray.length; s++) {                      //console.log(shoppingListArray[s])
        let currentList = shoppingListArray[s]
        let currentListID = currentList[0]
        let currentListValues = currentList[1]
        addItemToShoppingListEl(currentListValues[s])
    }
})