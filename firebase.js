import { initializeApp } from "firebase/app";
import { REACT_APP_FIREBASE_API } from "@env";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API,
  authDomain: "snap-native-app.firebaseapp.com",
  projectId: "snap-native-app",
  storageBucket: "snap-native-app.appspot.com",
  messagingSenderId: "17225779380",
  appId: "1:17225779380:web:df9ddd0800245387e32fe1",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { db, storage, provider, auth };
