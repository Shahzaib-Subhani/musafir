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
} from "./config.js";


export const updateAdminProfile = async (adminName, adminPhone, adminCnic, adminUid) => {
    
    const docRef = doc(db, "users", adminUid);
    const docSnap = await getDoc(docRef);
    var userObj = docSnap.data();
    console.log(userObj);
    userObj.name = adminName;
    userObj.phone = adminPhone;
    userObj.cnic = adminCnic;
    console.log(userObj);
    updateDoc(docRef, userObj).then((res) => {
        if (res == undefined) {
            document.getElementById("updateProfileMSG").innerHTML = ` <div class="alert alert-success w-100 text-white text-bold">
            Profile Update Successfully.
        </div>`;
            window.localStorage.setItem("admin", JSON.stringify(userObj))
            setTimeout(() => {
                window.location.href = "index.php?page=profile"
            }, 1000);
        }
    });
};