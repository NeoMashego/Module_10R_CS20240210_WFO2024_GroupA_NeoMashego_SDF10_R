import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()){
        let shoppingListArray = Object.entries(snapshot.val())                     //console.log(shoppingListArray)

        clearShoppingListEl()

        for (let s = 1; s < shoppingListArray.length; s++) {                      //console.log(shoppingListArray[s])
            let currentList = shoppingListArray[s]
            let currentListID = currentList[0]
            let currentListValues = currentList[1]

            appendItemToShoppingListEl(currentList)
        }
    } else {
        shoppingListEl.innerHTML = "No items here..."
    }
    
})

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")                //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)           //console.log(itemID)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}