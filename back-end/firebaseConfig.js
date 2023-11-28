import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, setPersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAUWz7jfrt46iBvAnZ-AESn8kNmqtbTlmw",
    authDomain: "callarboat-19b3b.firebaseapp.com",
    projectId: "callarboat-19b3b",
    storageBucket: "callarboat-19b3b.appspot.com",
    messagingSenderId: "68894973461",
    appId: "1:68894973461:web:008be388c45659cb7d781c",
    measurementId: "G-F86YXR2HNM"
  };

  const app = initializeApp(firebaseConfig);
  const authorized = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  const db = getFirestore(app);

  const auth = getAuth(app);
  
  export { app, db, auth, authorized };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
