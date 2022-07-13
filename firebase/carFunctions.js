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
    doc,
    getDoc,

    updateDoc ,
    
} from "./config.js" 

import { addCarCollection, addCars } from "./cars.js"

export async function updateCarStatus(transportName, carType, status) {
    console.log(transportName, carType, status);
    console.log("life is good");


    /* Ref */
    const docRef = doc(db, "transport", transportName);

    const docSnap = await getDoc(docRef);
    var carArrayCollection = docSnap.data();

    /* Getting Object For Update */
    var carArray = carArrayCollection[carType];

    /* Change status */
    console.log(status, " ia m slk");
    if (status == "true") {
        status = false;
    } else {
        status = true;
    }
    console.log(status, "i am status");
    carArray["status"] = status;


    /* Setting Dynamic key of object */
    var key = carType;
    var obj = {};
    obj[key] = carArray;



    console.log(obj, "i am object");
    console.log(obj);

    /* Update Object */
    updateDoc(docRef,
        obj
    ).then(res => {
        console.log(res);

        if (res == undefined) {
            addCarCollection();
        }

    });


}


export async function editCarFunc(transportName, carCompany,iconUrl){
    // document.body.scrollTop = 100;
    // document.documentElement.scrollTop = document.body.scrollTop = 1000;

    
    var transportNameInput =   document.getElementById("transportName");
    var carTypeInput =   document.getElementById("carType");

    const docRef = doc(db, "transport", transportName);

    const docSnap = await getDoc(docRef);
    var carArrayCollection = docSnap.data();
    var carObj =  carArrayCollection[carCompany];
   var icon =  carArrayCollection[iconUrl];

    transportNameInput.value = transportName;
    carTypeInput.value = carObj.carCompany;
    sessionStorage.setItem('icon_url',carObj.iconUrl);

    


    var carBrandRow = "";
    var i = 1;

    (carObj.carBrand).map(car => {
        i += 1; 
        carBrandRow +=  "<tr id='row" + i + "'><td><div class='addMore_ingr d-flex align-items-center' id='row" + i + "' ><input type='text' id='carBrand' value='"+car+"' class='form-control mr-2' placeholder='Car Brand' required> <div><i onclick='' id='" + i + "' class='p-1 m-3 mx-2 fas fa-times " + i + " rm_ingr_tr btn_remove_ingr'></i></div></div></td></tr>";
    })

    console.log(carBrandRow, " i am car brand row");
    console.log(sessionStorage.getItem('icon_url'));
    


    // document.getElementsByClassName("dynamic_fields_tr").innerHTML = carBrandRow;
    document.getElementById("customRow").innerHTML = carBrandRow;
    document.getElementById("addNewCars").value = "update";

}

export async function delCollection(){
    alert("life");
}

 






