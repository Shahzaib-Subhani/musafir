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
    updateDoc,
    ref  , uploadBytesResumable , getDownloadURL,storage,
} from "./config.js"



/* Adding Dynmic Inputs For Area List */
var i = 1;
$("#add_ingr_tr").click(() => {
    i++;
    $(".dynamic_fields_tr").append("<tr id='row" + i + "'><td><div class='addMore_ingr d-flex align-items-center'><input type='text' id='carBrand' class='form-control mr-2' placeholder='Car Brand' required> <div><i onclick='' id='" + i + "' class='p-1 m-3 mx-2 fas fa-times " + i + " rm_ingr_tr btn_remove_ingr'></i></div></div></td></tr>");
});


$(document).on("click", ".btn_remove_ingr", function () {
    var button_id = $(this).attr('id');
    $("#row" + button_id + "").remove();
});



var addNewCars = document.getElementById("addNewCars")

/* Add Car Funtion */
function addCars(action, cars, carType, transportName,) {
    addNewCars.innerText = "Add";
    console.log(cars,"i am cars");
    console.log(carType,"i am car type");
    console.log(transportName,"i am car name");
    console.log( action,"i am car action");

    carType = carType.toLowerCase();
    transportName = transportName.toLowerCase();

    /* Creating car list */
    var carList = [...cars].map(input => input.value !== undefined && input.value);
    carList = carList.filter(el => el != "");

    /* Creating Object */
    var key = carType;
    var obj = {};
    
    obj[key] = {
        carBrand: carList,
        carCompany: carType,
        status: true,
       
        timestamp: Date.now()
    }
console.log(obj)
    /* Setting Car Object In Firebase */
  async  function setCarDoc(transportName, obj, showMsg) {
        console.log(transportName, obj, showMsg)
        transportName = transportName.toLowerCase();
        setDoc(doc(db, "transport", transportName),
            obj, {
                merge: true,
                
            }
        ).then(msg => {
            if (msg === undefined) {
            addCarCollection();

                document.getElementById("customRow").innerHTML = "<h1></h1>";
                document.getElementById("carMsg").innerHTML = `<p class="success-msg">${showMsg}</p>`;
                document.getElementById("carForm").reset();
                setTimeout(() => {
                    document.getElementById("carMsg").innerHTML = '';
                    
                    // location.reload();
                }, 2000);
            }
        })
    }



    /* Get & Set Cars Function */
    async function getCars() {
        /* Get Data From Firebase  */
        const docRef = doc(db, "transport", transportName);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
        var carObj = docSnap.data();
        console.log(carObj)

        /* Car Name Array */
        let companyName = [];
        companyName = carObj ? Object.keys(carObj) : [];



        if (action == "add") {
            /* Check If array contain car type */
            if (companyName.includes(carType)) {
                console.log('first if ')

                /* Confirm to over write or cancel */
                if (confirm("Transport already exist. \n Do you want to over write?")) {
                    console.log(transportName, obj, "Car Collection Over Written message");
                    setCarDoc(transportName, obj, "Car Collection Over Written");
                  
                } else {
                    document.getElementById("carForm").reset();
                    console.log('2nd else')
                }
            } else {
                console.log('first else ')
                document.getElementById("carForm").reset();
            }
        } else {
            /* if action is update so simply update */
            console.log('update function')
            setCarDoc(transportName, obj, "Car Collection Updated");
            document.getElementById("carForm").reset();
            addNewCars.value = "add";
            addCarCollection();
           


        }
    }else{
        setCarDoc(transportName, obj, "Car Collection Added Successfully");
       
        
    }


    }


    /* Calling Get And Set Car Funtion */
    getCars();

}


if(addNewCars){
    
addNewCars.addEventListener("click", () => {
    var cars = document.querySelectorAll("#carBrand");
    var carType = document.getElementById("carType").value;
    var transportName = document.getElementById("transportName").value;
    var addNewCarsValue = document.getElementById("addNewCars").value;
    addCars(addNewCarsValue, cars, carType, transportName);
});

}


/* Add Car Collection IN html page */
function addCarCollection() {

    /* firebase query */
    getDocs(collection(db, "transport"))
        .then((querySnapshot) => {

            var newCarCollection = querySnapshot.docs
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));


            console.log(newCarCollection);

            var carRows = ""; 
            var num = 1;
            newCarCollection.map(car => {

                var companyType = Object.values(car)[Object.values(car).length - 1];
                /* Delete last element from object which is id */
                delete car["id"];

                var carCollection = Object.values(car);

                carCollection.map(carObj => {

                    /* Date Setting */
                    var date = new Date(carObj.timestamp);
                    date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

                    /* combining carBrand array with ,  */
                    var carBrandStr = (carObj.carBrand);

                    carBrandStr = carBrandStr;

                    /* table row html for car collection  */
                    console.log(carBrandStr);
                    carRows += `<tr>
                <td>${num}</td>
                <td>${(companyType)}</td>
                <td>${(carObj.carCompany)}</td>
                <td>${carBrandStr}</td>
                <td>${date}</td>
                <td>${carObj.status == true ? "Approved": "Pending"}</td>
                <td class="align-middle text-center ">
                <button onClick="showUpdate(this)" value="${companyType},${carObj.carCompany},${carObj.status}" class='btn btn-sm p-2 
                btn-${carObj.status == true ? "danger" :"success" }'>
                ${carObj.status == true ? "Disable" : "Enable" }
                </button>
              </td>
              <td class="align-middle text-center ">
              <button onClick="editCar(this)" value="${companyType},${carObj.carCompany},${carObj.iconUrl}" class='btn btn-sm p-2 
              btn-info'>
              Edit
              </button>
              </td>

       

                </tr>`;
                    // console.log(carRows);
                    num += 1;
                });
            })
            document.getElementById("carCollections").innerHTML = carRows;

            // document.getElementById("carCard").innerHTML =  "<h1>life is good</h1>";

        })
        .catch((err) => {

            // TODO: Handle errors
            console.error("Failed to retrieve data", err);
        });



}

export { 
    addCarCollection,
    addCars
};


/* On Load Window show Car Collection data */
window.onload = async () => {
    addCarCollection();
    transportlist ();
    sessionStorage.removeItem('icon_url');
    
};






// async function updateCarStatus(transportName, carType, status) {

//     /* Ref */
//     const docRef = doc(db, "transport", transportName);

//     const docSnap = await getDoc(docRef);
//     var carArrayCollection = docSnap.data();

//     /* Getting Object For Update */
//     var carArray = carArrayCollection[carType];

//     /* Change status */
//     carArray["status"] = status;

//     /* Setting Dynamic key of object */
//     var key = carType;
//     var obj = {};
//     obj[key] = carArray;

//     /* Update Object */
//     updateDoc(docRef, {
//         honda: carArray
//     }).then(res => console.log(res));
// }


// updateCarStatus("sedan", "honda", true);
async function transportlist() {
  
    const querySnapshot = await getDocs(collection(db, "transport"))
   
    
    let num = 1;
    let my = [];
    
    let transportRow='<option value="" disabled selected>Select Transport</option>' ;
    querySnapshot.docs
        .map((doc) => {
            let name = doc.id;
            console.log(name);
             return transportRow += `
             
                        <option value='${name}'>${name.toUpperCase()}</option>`;
            
            return
        })
         
       

    // var carRows = "";

  
    document.getElementById("listTransport").innerHTML = transportRow;


}


export {
    transportlist
}









export function uploadImage(e)
{
  console.log(e.target.files[0].type)
  var imgname = e.target.files[0].type;
  if(imgname == 'image/png'){
    var imagetoupload =e.target.files[0];

      var imgname = e.target.files[0].name;

      const metaData = {
          contentType : imagetoupload.type

      }



      const storageref = ref(storage, "transport/"+imgname);

      const uploadtask = uploadBytesResumable(storageref, imagetoupload , metaData);

      uploadtask.on('state-changed', (snapshot) => {

          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          $('#addIcon').text('Image is Uploading, Please Wait..');
          $('#addIcon').addClass('disabled');
        
        console.log(progress)
      },
      (error) => {
          alert("Image Not Uploaded");
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL)=> {
            $('#addIcon').text('Submit');
            $('#addIcon').removeClass('disabled');
            sessionStorage.setItem("icon_url", downloadURL);
            console.log(sessionStorage.getItem("icon_url"));
            
          })
      }
      )
          }


          else{
            alert("Only PNG Format  is Allowed !");
          }
   

}


export async function addIcon()
{
    const transport_name = document.getElementById('listTransport').value;
   
    if(transport_name == ''){
        alert('Transport is Required !');
    }
    else{
        
        const imageURL = sessionStorage.getItem('icon_url');
       
        if( imageURL == null){
           
           alert('Image is required !');
        }
        else{
             const washingtonRef = doc(db, "transport", transport_name);
    
            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, {
            iconUrl: imageURL
            }).then(response => {
               sessionStorage.removeItem('icon_url');
               document.getElementById("transMsg").innerHTML = `<p class="success-msg">Image Uploaded Successfully</p>`;
               document.getElementById("iconForm").reset();
               setTimeout(() => {
                document.getElementById("transMsg").innerHTML = '';
                
            }, 3000);
    
            });
          
        }
    }
   
    
}

