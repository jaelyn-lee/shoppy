import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDatabase, ref, get, set, remove } from 'firebase/database'
import { User } from '../types/user'
import { Product, SelectedProduct } from '../types/product'
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

export function onUserStateChanged(callback: (user: User | null) => void) {
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

//CART FUNC
//Get products by userId
export async function getCartsByUserId(userId: string) {
  return get(ref(db, `carts/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const items: SelectedProduct = snapshot.val() || {}
      return Object.values(items)
    } else {
      console.log('[Firebase error]: Data is not received.')
      return {}
    }
  })
}

//Add or update products to shopping cart
export async function addOrUpdateProductToCart(
  product: SelectedProduct,
  userId: string
) {
  return set(ref(db, `carts/${userId}/${product.id}`), product)
    .then(() => console.log('Item has been added successfully! 🎉'))
    .catch(console.error)
}

//Delete product by productId
export async function deleteProductByProductId(
  userId: string,
  productId: string
) {
  return remove(ref(db, `carts/${userId}/${productId}`)).catch(console.error)
}

//Empty cart after order placed
export async function emptyCart(userId: string) {
  return set(ref(db, `carts/${userId}`), null).catch(console.error)
}
