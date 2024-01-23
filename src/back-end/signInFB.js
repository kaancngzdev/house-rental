import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr5IP84sJViNSI_XLit44MoCECUq2seko",
  authDomain: "houserent-5579d.firebaseapp.com",
  projectId: "houserent-5579d",
  storageBucket: "houserent-5579d.appspot.com",
  messagingSenderId: "1083217632660",
  appId: "1:1083217632660:web:ea27e18e37fab3bf07c381",
  measurementId: "G-SRNE2DQ6CZ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const checkIfUserExists = async (email, password) => {
  const usersRef = collection(db, "Users");
  const q = query(
    usersRef,
    where("email", "==", email),
    where("password", "==", password)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const getUserRole = async (email) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error("User not found.");
  }

  let userRole;
  querySnapshot.forEach((doc) => {
    const { role } = doc.data();
    userRole = role;
  });

  return userRole;
};
const getUserId = async (email) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error("User not found.");
  }

  let userId;
  querySnapshot.forEach((doc) => {
    const { id } = doc.data(); 
    userId = id;
  });
  console.log("auser id is : "+userId);
  return userId;
};

const signInUser = async (email, password) => {
  const userExists = await checkIfUserExists(email, password);
  const userData = {
    email: email,
    role: await getUserRole(email),
    id: await  getUserId(email) 
  };
  console.log(userData);
  console.log(localStorage.getItem('user2', JSON.stringify(userData)));
  console.log(await getUserRole(email));
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('user2', JSON.stringify(userData));
  localStorage.setItem('user3', JSON.stringify(userData));
  localStorage.setItem('auth', JSON.stringify(true));
  let result = localStorage.getItem('user2', JSON.stringify(userData));
  console.log("asdasd"+ result);
  if (!userExists) {
    alert("Invalid credentials. User not found.")
    throw new Error("Invalid credentials. User not found.");
  }
  
  return { email };
};

export { signInUser };