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









/* Adding New City */


function addCity() {



    var question = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;


    // Add a new document in collection "cities"
    addDoc(collection(db, "faqs"), {
        question: question,
        answer: answer,
        status: true
    }).then(msg => {
        if (msg === undefined) {
            document.getElementById("cityForm").reset();
            document.getElementById("cityMsg").innerHTML = '<p class="success-msg"> FAQ ' + addNewCity.value + '</p>';
            setTimeout(() => {
                document.getElementById("cityMsg").innerHTML = '';
                addNewCity.value = 'Added Successfully';
                addCitiesCollection();

            }, 2000);

        }
    })



}

addNewCity.addEventListener("click", addCity);

/* Adding City COllection in html from firebase */
async function addCitiesCollection() {
  
    const querySnapshot = await getDocs(collection(db, "faqs"))
   
    
    let num = 1;
    let citiesRow = "";
    querySnapshot.docs
        .map((doc) => {
            let question = doc.data()?.question;
            let answer = doc.data()?.answer;
    
            let cityStatus = doc.data()?.status;
            return citiesRow += `<tr>
            <td>${num++}</td>
            <td>${(question).toUpperCase()}</td>
            <td>${(answer).toUpperCase()}</td>
            <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-${cityStatus == true ? 'success' : 'danger'}">${cityStatus == true ? 'Active' : 'Not Active'}</span>
            </td>
            <td class="align-middle text-center ">
            <button onclick="updateProfileStsBtn('${doc?.id}','${cityStatus}')" id="user${doc?.id}1"  class='btn btn-xm p-2  bg-gradient-${cityStatus == true ? 'danger' : 'info'}' style="margin-bottom:-0px">
            ${cityStatus == true ? 'Disable' : 'Approve'}
            </button>
            </td>
                    
         </tr>`;

        });


    // var carRows = "";

  
    document.getElementById("citiesCollections").innerHTML = citiesRow;


}


export {
    addCitiesCollection
}

window.onload = async () => {
    addCitiesCollection();
};

