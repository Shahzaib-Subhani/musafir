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




/* Adding Dynmic Inputs For Area List */
var i = 1;
$("#add_ingr_tr").click(() => {
    i++;
    $(".dynamic_fields_tr").append("<tr id='row" + i + "'><td><div class='addMore_ingr d-flex align-items-center'><input type='text' id='areaName' class='form-control mr-2' placeholder='Area Name' required> <div><i onclick='' id='" + i + "' class='p-1 m-3 mx-2 fas fa-times " + i + " rm_ingr_tr btn_remove_ingr'></i></div></div></td></tr>");
});
$(document).on("click", ".btn_remove_ingr", function () {
    var button_id = $(this).attr('id');
    $("#row" + button_id + "").remove();
});




/* Adding New City */
var addNewCity = document.getElementById("addNewCity")

function addCity() {

    var area = document.querySelectorAll("#areaName");
    var areaList = [...area].map(input => input.value !== undefined && input.value);
    areaList = areaList.filter(el => el != "");
    areaList = areaList.map(area => {
        return {
            areaName: area.toLowerCase(),
            areaStatus: true
        }
    })

    var city = document.getElementById("city").value;
    var lowcity = city.toLowerCase();
    var province = document.getElementById("province").value;
    var lowprovince = province.toLowerCase()

    // Add a new document in collection "cities"
    setDoc(doc(db, "cities", lowcity), {
        areas: areaList,
        province: lowprovince,
        status: true
    }).then(msg => {
        if (msg === undefined) {
            document.getElementById("cityForm").reset();
            document.getElementById("cityMsg").innerHTML = '<p class="success-msg"> City '+addNewCity.value+'ed</p>';
            setTimeout(() => {
                document.getElementById("cityMsg").innerHTML = '';
                addNewCity.value = 'add';
                addCitiesCollection();
                document.getElementById("dynamic_fields_tr").innerHTML = "";
            }, 2000);

        }
    })

    console.log(areaList);

}

addNewCity.addEventListener("click", addCity);

/* Adding City COllection in html from firebase */
function addCitiesCollection(){
    console.log("some one call me to function");
    getDocs(collection(db, "cities"))
        .then((querySnapshot) => {

            var newCitiesCollection = querySnapshot.docs
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));


            // var carRows = "";
            var num = 0;
            var citiesRow = "";
            newCitiesCollection.map(city => {
                var cityName = city?.id;
                var province = city?.province;
                var cityStatus = city?.status;
                var areaArray = city?.areas;

                areaArray.map(area => {
                    num += 1;
                    var areaName = area?.areaName || "";
                    var areaStatus = area?.areaStatus || "";
                    console.log(areaStatus);
                    
                    return citiesRow += `<tr>
                    <td>${num}</td>
                    <td>${(cityName).toUpperCase()}</td>
                    <td>${province}</td>
                    <td>${areaName}</td>
                    <td>${areaStatus == true ? "Approved": "Pending"}</td>
                    <td class="align-middle text-center ">
                    <button onClick="updateCities(this)" value="${cityName},${areaName},${areaStatus}" class='btn btn-sm p-2 
                    btn-${areaStatus == true ? "danger" :"success" }'>
                    ${areaStatus == true ? "Disable" : "Enable" }
                    </button>
                  </td>
                  <td class="align-middle text-center ">
                  <button onClick="editCities(this)" value="${cityName},${areaName}" class='btn btn-sm p-2 
                  btn-info'>
                  Edit
                  </button>
                  </td>
                 </tr>`;

                })
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

