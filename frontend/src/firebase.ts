import { initializeApp } from 'firebase/app'
import { getAuth,GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyBgRanBBWLyjS7P5F1kk-vQy6WLv7686FQ",

  authDomain: "alteco-40a5e.firebaseapp.com",

  projectId: "alteco-40a5e",

  storageBucket: "alteco-40a5e.firebasestorage.app",

  messagingSenderId: "283802003774",

  appId: "1:283802003774:web:365e81b47b65243059646f"

}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)


export const googleProvider = new GoogleAuthProvider()
