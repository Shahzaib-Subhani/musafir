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
    onSnapshot,
    getDoc,
    app,
    db,
    setDoc,
    doc
} from "./config.js"





async function getdata(id){
            
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef)
 return docSnap.data().name;
}

async function getpost(){
            
    const docRef = doc(db, "posts", 'R0OPMmcyQCQe8IFzkLRj');
    const docSnap = await getDoc(docRef)
  return docSnap.data().class;
}







/* Adding City COllection in html from firebase */
async function addCitiesCollection() {
    const querySnapshot = await getDocs(collection(db, "report"))
    let htmltableString=''
    let num=1
    const promises = querySnapshot.docs.map(async doc => {
                const from = doc.data()?.from;
                const to = doc.data()?.to;
                const product = doc.data()?.productId;
                const cityStatus = doc.data()?.reportTxt;


                const user = await getdata(from);
                const userReported = await getdata(to);
                // const post = await getpost(product);
                

        return  htmltableString += `<tr>
                <td>${num++}</td>
                <td>${user}</td>
                <td>${userReported}</td>
                <td class="align-middle text-center text-sm">
                ${cityStatus}
                </td>
               
                        
             </tr>`;
      })
   
    const user = await Promise.all(promises)
   
    // var carRows = "";

  return user
   


}


export {
    addCitiesCollection
}

window.onload = async () => {
  const citiesRow= await addCitiesCollection();
  
   document.getElementById("citiesCollections").innerHTML = citiesRow;
};









//  <td class="align-middle text-center ">
{/* <button onclick="updateProfileStsBtn('${doc?.id}','${cityStatus}')" id="user${doc?.id}1"  class='btn btn-xm p-2  bg-gradient-${cityStatus == true ? 'danger' : 'info'}' style="margin-bottom:-0px">
${cityStatus == true ? 'Disable' : 'Approve'}
</button>
</td> */}