import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, getDocs, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUf9lkTOZBtlBkCyXEo9dd1sr3KUFmHL0",
  authDomain: "clothing-3818c.firebaseapp.com",
  projectId: "clothing-3818c",
  storageBucket: "clothing-3818c.appspot.com",
  messagingSenderId: "333996056904",
  appId: "1:333996056904:web:8b71ae87a20a2146d0937d",
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const createUserDocRefFromAuth = async (
  userAuth,
  additionInformation = {}
) => {
  const userDocRef = doc(db, "user", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionInformation,
      });
    } catch (error) {
      console.log("Error in creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => { await signOut(auth) }

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
    console.log(object)
  });

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const querySnapShotData = querySnapShot.docs;
  const categoriesMap = querySnapShotData.reduce((acc, category) => {
    const {title, items} = category.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoriesMap;
}