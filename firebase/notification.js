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
   
    const tokens = [];
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

            return tokens;
            
  }

 

async function addCity() {
  

    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var category = document.getElementById("category").value;
    var user ;
    if(document.getElementById('all').checked > 0){
       user = 'all';
    }
    else{
      user =  'specific';
    }
    

    if(user == 'specific'){
      
      var array1 = []
      var checkboxes = document.querySelectorAll('.onecheck:checked')
      
      for (var i = 0; i < checkboxes.length; i++) {
        array1.push(checkboxes[i].value)
      }
        let AllSelectedTokens=[]
        array1.map((item,index)=>{
          const splitedArray=item.split(',')
          AllSelectedTokens=[...AllSelectedTokens,...splitedArray]
        })
          console.log(AllSelectedTokens)
      
        if(AllSelectedTokens == ''){
          document.getElementById("cityMsg").innerHTML = `<p class="danger-msg">Please Select at least one user</p>`;
          
          setTimeout(() => {
              document.getElementById("cityMsg").innerHTML = '';
              
              // location.reload();
          }, 4000);
        }

        else{
          var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const body =JSON.stringify({
          title: title,
          message: desc,
          data: {},
          tokens: AllSelectedTokens
        });
        
        let requestOptions = {
          method: 'POST',
          
          headers:myHeaders,
          body: body,
          redirect:'follow'
        };
       fetch("https://musafirpushnotifications21.herokuapp.com/notifications", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result),
          document.getElementById("cityMsg").innerHTML = `<p class="success-msg">Notification sent successfully !</p>`,
          setTimeout(() => {
            
            document.getElementById("cityMsg").innerHTML = '';
            location.reload();
        }, 4000)
          )
          .catch(error => console.log('error', error));
        }
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
        const AllTokens =await  allusers();
        console.table(AllTokens,'tokenns')
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const body =JSON.stringify({
          title: title,
          message: desc,
          data: {},
          tokens: AllTokens
        });
        
        let requestOptions = {
          method: 'POST',
          
          headers:myHeaders,
          body: body,
          redirect:'follow'
        };
       fetch("https://musafirpushnotifications21.herokuapp.com/notifications", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result);
          })
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
    
    let citiesRow='' ;
    querySnapshot.docs
        .map((doc) => {
            let name = doc.data()?.name;
            let dtoken = doc.data()?.deviceToken;
    
            let phone = doc.data()?.phone;
            my.push(dtoken)
            if(dtoken.length > 0){
            return citiesRow += `
                         <label for="one"></label>
                        <input type="checkbox" value='${dtoken}' id="one" class='onecheck me-1' />${name}</label>`;
            }
            return
        })
         
       

    // var carRows = "";

  
    document.getElementById("checkboxes").innerHTML = citiesRow;


}


export {
    addCitiesCollection
}

window.onload = async () => {
    addCitiesCollection();
};



