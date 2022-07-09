import {
    initializeApp,
    getAuth,
    signInWithEmailAndPassword,
    getFirestore,
    collection, 
    query,
    where,
    getDocs,
    app,
    db,
    setDoc,
    doc
} from "./config.js"









/* Adding New City */


function addCity() {

   

    var city = document.getElementById("city").value;
  

    // Add a new document in collection "cities"
    setDoc(doc(db, "occupations", city), {
        name: city,
        status: true
    }).then(msg => {
        if (msg === undefined) {
            document.getElementById("cityForm").reset();
            document.getElementById("cityMsg").innerHTML = '<p class="success-msg"> Occupation '+addNewCity.value+'</p>';
            setTimeout(() => {
                document.getElementById("cityMsg").innerHTML = '';
                addNewCity.value = 'add';
                addCitiesCollection();
               
            }, 2000);

        }
    })

    

}

addNewCity.addEventListener("click", addCity);

/* Adding City COllection in html from firebase */
function addCitiesCollection(){
    console.log("some one call me to function");
    getDocs(collection(db, "occupations"))
        .then((querySnapshot) => {

            var newCitiesCollection = querySnapshot.docs
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));


            // var carRows = "";
            var num = 1;
            var citiesRow = "";
            newCitiesCollection.map(city => {
                var cityName = city?.name;
                
                var cityStatus = city?.status;
                

                
                    
                    return citiesRow += `<tr>
                    <td>${num++}</td>
                    <td>${(cityName).toUpperCase()}</td>
                    <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-${cityStatus == true ? 'success': 'danger'}">${cityStatus == true ? 'Active': 'Not Active'}</span>
                    </td>
                    <td class="align-middle text-center ">
                    <button onclick="updateProfileStsBtn('${cityName}','${cityStatus}')" id="user${cityName}1"  class='btn btn-xm p-2  bg-gradient-${cityStatus == true ? 'danger': 'info'}' style="margin-bottom:-0px">
                    ${cityStatus == true ? 'Disable': 'Approve'}
                    </button>
                    </td>
                            
                 </tr>`;

                
            })
            document.getElementById("citiesCollections").innerHTML = citiesRow;
        })
        .catch((err) => {
            // TODO: Handle errors
            console.error("Failed to retrieve data", err);
        });
    }


export {
    addCitiesCollection
}

window.onload = async () => {
    addCitiesCollection();
};

