import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7Ijy_FJ9DbmdSxp4TOg4AWU0tcdF6wQ0",
  authDomain: "vue-invoiceapp-df614.firebaseapp.com",
  projectId: "vue-invoiceapp-df614",
  storageBucket: "vue-invoiceapp-df614.appspot.com",
  messagingSenderId: "537389653518",
  appId: "1:537389653518:web:22cc92263c99755d59665f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { collection, addDoc, getDocs, getDoc, deleteDoc, updateDoc, doc };
export default db;
