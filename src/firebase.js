import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCB_jlghBqzNs0-YIUixyO0ENE7q1JZPdU",
    authDomain: "mdev1005-reactapp.firebaseapp.com",
    projectId: "mdev1005-reactapp",
    storageBucket: "mdev1005-reactapp.firebasestorage.app",
    messagingSenderId: "843773264825",
    appId: "1:843773264825:web:bb6097e1f96895e38e2c68"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
