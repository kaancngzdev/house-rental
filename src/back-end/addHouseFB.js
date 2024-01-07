
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {  collection, addDoc, query, where, getDocs } from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDr5IP84sJViNSI_XLit44MoCECUq2seko",
  authDomain: "houserent-5579d.firebaseapp.com",
  projectId: "houserent-5579d",
  storageBucket: "houserent-5579d.appspot.com",
  messagingSenderId: "1083217632660",
  appId: "1:1083217632660:web:ea27e18e37fab3bf07c381",
  measurementId: "G-SRNE2DQ6CZ"
}
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const addHouseToFirestore = async (houseData) => {
    try {
      await addDoc(collection(db, "Houses"), houseData);
      return 'House added to Firestore';
    } catch (error) {
      throw error;
    }
  };
  
  export { addHouseToFirestore };