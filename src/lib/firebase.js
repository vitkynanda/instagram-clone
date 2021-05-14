import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyCl-1xtYVUlGSA0NayNwHHgBHhwFXW2_os",
  authDomain: "instagram-clone-yt-b6696.firebaseapp.com",
  projectId: "instagram-clone-yt-b6696",
  storageBucket: "instagram-clone-yt-b6696.appspot.com",
  messagingSenderId: "906215634905",
  appId: "1:906215634905:web:f3c8f282f5c0d86466cbc8",
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
