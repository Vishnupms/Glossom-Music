// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyBogyiCXq_V7NS5l94Tk9fCsEBpwhPj490",
    authDomain: "glossom-music.firebaseapp.com",
    projectId: "glossom-music",
    storageBucket: "glossom-music.appspot.com",
    messagingSenderId: "328767048157",
    appId: "1:328767048157:web:fad74291d6cf5698a88e34",

  };

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export const Auth = getAuth(app);
export { app, storage };