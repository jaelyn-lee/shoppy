import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDatabase, ref, get } from 'firebase/database'
import { User } from '../types/user'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  databaseURL: import.meta.env.VITE_DB_URL,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const database = getDatabase(app)

export function login() {
  signInWithPopup(auth, provider).catch(console.error)
}

export function logout() {
  signOut(auth).catch(console.error)
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null

    callback(updatedUser)
  })
}

async function adminUser(user: User) {
  return get(ref(database, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val()
      const isAdmin = admins.includes(user.uid)
      return { ...user, isAdmin }
    }
    return user
  })
}
