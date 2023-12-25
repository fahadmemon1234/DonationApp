import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtnvG-sOniyE5gswS_NXMHeyrGn7SYnCs",
  authDomain: "donation-app-123.firebaseapp.com",
  databaseURL: "https://donation-app-123-default-rtdb.firebaseio.com",
  projectId: "donation-app-123",
  storageBucket: "donation-app-123.appspot.com",
  messagingSenderId: "68252012065",
  appId: "1:68252012065:web:16cab682c89d1e94695d60"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage, app };