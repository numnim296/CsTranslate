import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyARgRUwXlvqrOgLu-2rngvzgRsd8dLWTdg",
    authDomain: "cs-translate-a4759.firebaseapp.com",
    databaseURL: "https://cs-translate-a4759.firebaseio.com",
    projectId: "cs-translate-a4759",
    storageBucket: "cs-translate-a4759.appspot.com",
    messagingSenderId: "104770233051",
    appId: "1:104770233051:web:d33dc35e45eb2d9b3a22fe",
    measurementId: "G-BVXMG86425"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export default firebase
