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



export async function updateUserStatus(uid, sts) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    var userObj = docSnap.data();
    sessionStorage.setItem("modal",uid)
        if (sts == "false") {
            userObj.status = true;
            userObj.reason = "";
        } else {
            userObj.status = false;
            
        }
        updateDoc(docRef, userObj).then((res) => {
            if (res == undefined) {
                return true;
            }
        });
   
};
export async function updateProfileStatus(uid, sts) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    var userObj = docSnap.data();
    if (sts == "unverified") {
        userObj.profileStatus = "verified";
    } else {
        userObj.profileStatus = "unverified";
    }
    updateDoc(docRef, userObj).then((res) => {
        if (res == undefined) {
            return true;

        }
    });
};





export async function reason(uid,txt) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    var userObj = docSnap.data();
    userObj.reason = txt;
        updateDoc(docRef, userObj).then((res) => {
            sessionStorage.removeItem("modal");
            
            if (res == undefined) {
                return true;
            }
        });
        console.log(uid,txt);
   
};





 
