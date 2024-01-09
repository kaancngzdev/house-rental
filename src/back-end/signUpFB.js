
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {  collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

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

const checkIfEmailExists = async (email) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const addUserToFirestore = async (userData) => {
  const { email } = userData;
  
  // Check if the email exists
  const emailExists = await checkIfEmailExists(email);
  if (emailExists) {
    alert("Email already exists!");
    return "Email already exists!"; 
  }

  try {
    const result = await addDoc(collection(db, "Users"), userData);
    const userRef = doc(db, "Users", result.id); // Access 'id' instead of 'userId'
    
    // Add the 'id' attribute to userData
    const userDataWithId = { ...userData, id: result.id };

    await setDoc(userRef, userDataWithId);
    return 'User added to Firestore';
    
  } catch (error) {
    throw error;
  }
};

export { addUserToFirestore };