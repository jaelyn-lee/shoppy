import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDatabase, ref, get, set, push } from 'firebase/database'
import { User } from '../types/user'
import { Product } from '../types/product'
import { v4 as uuid } from 'uuid'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  databaseURL: import.meta.env.VITE_DB_URL,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getDatabase(app)

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
  return get(ref(db, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val()
      const isAdmin = admins.includes(user.uid)

      return { ...user, isAdmin }
    }
    return user
  })
}

export async function addNewProduct(product: Product, imageUrl: string) {
  const id = uuid()
  const newProductRef = ref(db, `products/${id}`)
  return set(newProductRef, {
    ...product,
    id,
    price: product.price,
    image: imageUrl,
    options: product.options.split(','),
  })
    .then(() => {
      console.log('Data saved successfully! 🎉')
    })
    .catch(console.error)
}

export async function getAllProducts() {
  return get(ref(db, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val())
    } else {
      console.log('[Firebase error]: Data is not received.')
      return []
    }
  })
}

//CART
export async function addProductToCart(product: Product, userId: string) {
  const newItemRef = ref(db, `cart/${userId}`)
  return push(newItemRef, {
    ...product,
    userId,
  })
    .then(() => console.log('Item has been added successfully! 🎉'))
    .catch(console.error)
}

export async function getProductByUserId(userId: string) {
  return get(ref(db, `cart/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val())
    } else {
      console.log('[Firebase error]: Data is not received.')
      return []
    }
  })
}
