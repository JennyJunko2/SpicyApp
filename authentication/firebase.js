import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDOX5CaKcp9IZRmZuh7oghlalATxiZXR9k",
  authDomain: "spicy-app-8c459.firebaseapp.com",
  projectId: "spicy-app-8c459",
  storageBucket: "spicy-app-8c459.appspot.com",
  messagingSenderId: "1015161703139",
  appId: "1:1015161703139:web:80b85e6c80075d7b9753d6"
};
initializeApp(firebaseConfig);

export const auth = getAuth()

export const signup = (displayName, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {displayName})
    })
    .catch((error) => {
      console.log('error:',error)
      alert('Invalid inputs')
    })
}

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => console.log('login success'))
    .catch(() => alert('Invalid credential'))
}

export const logout = () => {
  signOut(auth)
    .then(() => console.log('signed out successfully'))
    .catch(() => console.log('could not sign out'))
}