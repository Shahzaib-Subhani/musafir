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
  

    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var category = document.getElementById("category").value;
    var user = document.getElementById("userCollection").value;

    if(title == '' || desc == '' || category == ''|| user == ''){
        document.getElementById("carMsg").innerHTML = `<p class="danger-msg">Please Fill All fields</p>`;
        setTimeout(() => {
            document.getElementById("carMsg").innerHTML = '';
            
            // location.reload();
        }, 2000);
    }
    if(user == 'all'){
        user =  allusers();
    }
    let notification = [title,desc,category,user];
    console.log(notification);

    // Add a new document in collection "cities"
    



}

addNewCity.addEventListener("click", addCity);







/* Adding City COllection in html from firebase */
async function addCitiesCollection() {
  
    const querySnapshot = await getDocs(collection(db, "users"))
   
    
    let num = 1;
    let citiesRow = `<option selected disabled > Select User </option>
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

