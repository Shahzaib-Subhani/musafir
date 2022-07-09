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
    updateDoc
} from "./config.js"
import {
    addCitiesCollection
} from "./cities.js"




export async function updateCitesStatus(cityName, areaName, status) {


    // console.log(cityName, "life");
    /* Ref */
    const docRef = doc(db, "cities", cityName);

    const docSnap = await getDoc(docRef);
    var citiesArrayCollection = docSnap.data();

    var areas = citiesArrayCollection.areas;
    var provinceName = citiesArrayCollection.province;
    var cityStatus = citiesArrayCollection.province;


    var updateArray = areas.map(area => {
        if (area.areaName == areaName) {
            area.areaStatus = !status;
            return area;
        } else {
            return area
        }
    }) 

    /* Update Object */
    updateDoc(docRef, {
        areas: updateArray,
        province: provinceName,
        status: cityStatus
    }).then(res => {
        console.log(res);
        if (res == undefined) {
            addCitiesCollection();
        }
    });


}




export async function editCityFunc(cityName) {

    /* Input field */
    var cityNameInput = document.getElementById("city");
    var province = document.getElementById("province");
    var dynamic_fields = document.getElementById("dynamic_fields_tr");
    var addCityBtn =   document.getElementById("addNewCity");
    var areaName = document.getElementById("areaName");

    const docRef = doc(db, "cities", cityName);
    const docSnap = await getDoc(docRef);
    var citiesArrayCollection = docSnap.data();

    console.log(citiesArrayCollection);



    var areaObj = citiesArrayCollection["areas"];
    console.log(areaObj);

    // transportNameInput.value = transportName;
    // carTypeInput.value = carObj.carCompany;
    areaName.value = areaObj[0].areaName;

    var areaRow = "";
    var i = 1;
    areaObj.shift();
    (areaObj).map(area => {
        i += 1;
        areaRow += "<tr id='row" + i + "'><td><div class='addMore_ingr d-flex align-items-center' id='row" + i + "' ><input type='text' id='carBrand' value='" + area.areaName + "' class='form-control mr-2' placeholder='Car Brand' required> <div><i onclick='' id='" + i + "' class='p-1 m-3 mx-2 fas fa-times " + i + " rm_ingr_tr btn_remove_ingr'></i></div></div></td></tr>";
    })

    console.log(areaRow, " i am area row");

    cityNameInput.value = cityName;
    province.value = citiesArrayCollection['province'];
    dynamic_fields.innerHTML += areaRow;
    addCityBtn.value = "Update";
    addCityBtn.innerText = "Update";
    
}