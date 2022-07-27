import {
    initializeApp,
    getAuth,
    signInWithEmailAndPassword,
    getFirestore,
    addDoc,
    collection,
    query,
    where,
    getDocs,
    app,
    db,
    setDoc,
    doc
} from "./config.js"


async function allusers(){
    const querySnapshot = await getDocs(collection(db, "users"))
   
    
        let num = 1;
    let users = [];
        querySnapshot.docs
            .map((doc) => {
            
                let age = doc.data()?.uid;
        
                
            
                users.push(age);

            });

            return users;
  }

 

function addCity() {
  

    // var title = document.getElementById("title").value;
    // var desc = document.getElementById("desc").value;
    // var category = document.getElementById("category").value;
    // var user = document.getElementById("userCollection").value;

    // if(title == '' || desc == '' || category == ''|| user == ''){
    //     document.getElementById("cityMsg").innerHTML = `<p class="danger-msg">${title == '' ? 'Title' : desc == '' ? 'Description' : category == '' ? 'Category' : user == '' ? 'User':null} field is empty</p>`;
    //     setTimeout(() => {
    //         document.getElementById("cityMsg").innerHTML = '';
            
    //         // location.reload();
    //     }, 4000);
    // }
    // else{
    //     if(user == 'all'){
    //     user =  allusers();
    // }
    // let notification = [title,desc,category,user];
    // console.log(notification);
    // }

    // Add a new document in collection "cities"
    

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = {
  title: "jahanzaib",
  message: "testing app",
  data: {},
  tokens: [
    "fx6D7MXjRsunHVJX3leJvH:APA91bEueD7CTBfVfCxu-TAL6_aAO2nETPXrEoLY_JcLvwZLRy-5GDUVmP7aomx85ZeyhH3xJq-mdUPoS6S5Q25Kwt3JKoIyBLqj3E6MOpcY9m9Y5rZZZJhS9FRvteSbtc7qJzwFNHti"
  ]
};

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  mode: 'no-cors'
};
console.log(requestOptions)
fetch("https://musafirpushnotifications21.herokuapp.com/notifications", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));



}

addNewCity.addEventListener("click", addCity);







/* Adding City COllection in html from firebase */
async function addCitiesCollection() {
  
    const querySnapshot = await getDocs(collection(db, "users"))
   
    
    let num = 1;
    let citiesRow = `<option selected disabled value='' > Select User </option>
    <option value='all' > All Users </option>`;
    querySnapshot.docs
        .map((doc) => {
            let name = doc.data()?.name;
            let age = doc.data()?.uid;
    
            let phone = doc.data()?.phone;
          
            return citiesRow += `
            
            <option value='${age}'>${name}</option>`;

        });


    // var carRows = "";

  
    document.getElementById("userCollection").innerHTML = citiesRow;


}


export {
    addCitiesCollection
}

window.onload = async () => {
    addCitiesCollection();
};



