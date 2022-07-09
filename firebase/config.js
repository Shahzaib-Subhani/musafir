export const firebaseConfig = {
    apiKey: "AIzaSyDrq2EjMbWiFhaV3XHfYF_MBFyb-cwnpJQ",
    authDomain: "musafir-49f4d.firebaseapp.com",
    projectId: "musafir-49f4d",
    storageBucket: "musafir-49f4d.appspot.com",
    messagingSenderId: "254193833075",
    appId: "1:254193833075:web:6fa00843a48fbb6fe68606",
    measurementId: "G-62D4VDC67S"
};
import {getStorage , ref  , uploadBytesResumable , getDownloadURL}  from  "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";


import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'

import {
    getAuth,
    signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'

import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
    getDocs,
    setDoc,
    addDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";



/* Initialize Firebase */
const app = initializeApp(firebaseConfig);
 

/* Initialize Firestore database */
var db = getFirestore();
const storage = getStorage();
export {
    initializeApp,
    getAuth,
    signInWithEmailAndPassword,
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    onSnapshot,
    app,
    db,
    setDoc,
    storage,
    doc,
    getDoc,
    updateDoc,
    getStorage , ref , uploadBytesResumable , getDownloadURL }






