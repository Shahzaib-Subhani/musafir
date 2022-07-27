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
    const users = [];
   querySnapshot.docs.map((doc)=>{
       if(doc.data().deviceToken){
           if((doc.data().deviceToken).length > 0 ){
            (doc.data().deviceToken).map(item =>{
                if(item !== ""){
                    tokens.push(item)
                }
            })
           }
       }
    })
            console.log(tokens)
            return tokens;
            
  }

 

function addCity() {
  

    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var category = document.getElementById("category").value;
    var user = document.getElementById("userCollection").value;

    if(user !== '' && user !== 'all'){
      let token = user.split(",");
    
        console.log(token[0]);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "title": title,
          "message": desc,
          "data": {},
          "tokens": [
            token[0] 
          ]
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://musafirpushnotifications21.herokuapp.com/notifications", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    if(title == '' || desc == '' || category == ''|| user == ''){
        document.getElementById("cityMsg").innerHTML = `<p class="danger-msg">${title == '' ? 'Title' : desc == '' ? 'Description' : category == '' ? 'Category' : user == '' ? 'User':null} field is empty</p>`;
        setTimeout(() => {
            document.getElementById("cityMsg").innerHTML = '';
            
            // location.reload();
        }, 4000);
        
    }

    
    else{
        if(user == 'all'){
        user =  allusers();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "title": title,
          "message": desc,
          "data": {},
          "tokens": [
            user
          ]
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://musafirpushnotifications21.herokuapp.com/notifications", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }
    
    

   
    

    }

   
    
    



}

addNewCity.addEventListener("click", addCity);







/* Adding City COllection in html from firebase */
async function addCitiesCollection() {
  
    const querySnapshot = await getDocs(collection(db, "users"))
   
    
    let num = 1;
    let my = [];
    
    let citiesRow = `<option selected disabled value='' > Select User </option>
    <option value='all' > All Users </option>`;
    querySnapshot.docs
        .map((doc) => {
            let name = doc.data()?.name;
            let dtoken = doc.data()?.deviceToken;
    
            let phone = doc.data()?.phone;
            my.push(dtoken)
            
            return citiesRow += `
            
            <option value='${dtoken}'>${name}</option>`;
            
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



