import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  databaseURL: import.meta.env.VITE_DB_URL,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
      console.log(user)

      return user
    })
    .catch(console.error)
}

export async function logout() {
  return signOut(auth)
    .then(() => {})
    .catch(console.error)
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}
