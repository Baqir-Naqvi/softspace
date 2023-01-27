// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBBLKksmgPr_MFyyjlE1A9x4zUPmTaQP98",
//   authDomain: "softspace-91e20.firebaseapp.com",
//   projectId: "softspace-91e20",
//   storageBucket: "softspace-91e20.appspot.com",
//   messagingSenderId: "369499497472",
//   appId: "1:369499497472:web:51411a0ddeaf157ccd64e5",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDycgBKFmqo8X_0mq72tBSjNV77-L9yO8Q",
  authDomain: "vendorsbrand-dev.firebaseapp.com",
  databaseURL: "https://vendorsbrand-dev-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vendorsbrand-dev",
  storageBucket: "vendorsbrand-dev.appspot.com",
  messagingSenderId: "759123192862",
  appId: "1:759123192862:web:d9ad6946a8d33396f1120f",
  measurementId: "G-Y73HVMZN7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

