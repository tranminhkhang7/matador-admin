// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/compat/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjqDJumYCUodzXQnmpDknLLQQ6CWllyj4",
  authDomain: "matador-36a30.firebaseapp.com",
  projectId: "matador-36a30",
  storageBucket: "matador-36a30.appspot.com",
  messagingSenderId: "144057703731",
  appId: "1:144057703731:web:99909a2683c499533cb246",
  measurementId: "G-N642HKW6MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage



