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

export async function updateProfileStatus(uid, sts) {
    const docRef = doc(db, "faqs", uid);
    const docSnap = await getDoc(docRef);
    var userObj = docSnap.data();
    if (sts == 'false') {
        userObj.status = true;
    } else {
        userObj.status = false;
    }
    updateDoc(docRef, userObj).then((res) => {
        if (res == undefined) {
            return true;

        }
    });
};



