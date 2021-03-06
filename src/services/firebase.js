import { initializeApp } from "firebase/app";
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const { REACT_APP_FIREBASE_API_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_APP_ID } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  appId: REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const projectStorage = getStorage();
const projectFirestore = getFirestore();

const downloadUrl = (fileName) => {

  const pathReference = ref(projectStorage, `pdf/${fileName}.pdf`);

  return getDownloadURL(pathReference);
};

export {
  db,
  projectStorage,
  projectFirestore,
  downloadUrl
};