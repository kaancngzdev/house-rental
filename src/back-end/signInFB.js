import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDr5IP84sJViNSI_XLit44MoCECUq2seko",
    authDomain: "houserent-5579d.firebaseapp.com",
    projectId: "houserent-5579d",
    storageBucket: "houserent-5579d.appspot.com",
    messagingSenderId: "1083217632660",
    appId: "1:1083217632660:web:ea27e18e37fab3bf07c381",
    measurementId: "G-SRNE2DQ6CZ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const checkIfUserExists = async (email, password) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("email", "==", email), where("password", "==", password));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const signInUser = async (email, password) => {
  const userExists = await checkIfUserExists(email, password);
  
  if (!userExists) {
    throw new Error("Invalid credentials. User not found.");
  }

  return { email }; 
};

export { signInUser };
