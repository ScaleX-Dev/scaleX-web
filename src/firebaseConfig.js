// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBbUo2nfDS4C1qYXYQmgx5sT8D-nC8-tyU",
    authDomain: "scalex-4cacd.firebaseapp.com",
    projectId: "scalex-4cacd",
    storageBucket: "scalex-4cacd.firebasestorage.app",
    messagingSenderId: "992804394699",
    appId: "1:992804394699:web:6473e9356f82d6aa8c6d4e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, db, storage, collection, getDocs};
