import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut
} from 'firebase/auth';
import {
  getFirestore, collection, addDoc, getDocs, doc, setDoc, query, where, updateDoc, serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app, auth, db;
function ensureInit() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
}

export const FirebaseAdapter = {
  name: 'firebase',
  init: () => ensureInit(),
  onAuthStateChanged: (cb) => { ensureInit(); return onAuthStateChanged(getAuth(), cb); },
  signIn: (email, password) => { ensureInit(); return signInWithEmailAndPassword(auth, email, password); },
  signUp: (email, password) => { ensureInit(); return createUserWithEmailAndPassword(auth, email, password); },
  signOut: () => { ensureInit(); return signOut(auth); },
  getUserCredits: async (uid) => {
    ensureInit();
    const docRef = doc(db, 'credits', uid);
    const snap = await (await import('firebase/firestore')).getDoc(docRef);
    if (!snap.exists()) {
      await setDoc(docRef, { balance: 1, updatedAt: serverTimestamp() });
      return 1;
    }
    return snap.data().balance ?? 0;
  },
  setUserCredits: async (uid, balance) => {
    ensureInit();
    const docRef = doc(db, 'credits', uid);
    await setDoc(docRef, { balance, updatedAt: serverTimestamp() }, { merge: true });
  },
  listFavors: async () => {
    ensureInit();
    const col = collection(db, 'favors');
    const qs = await getDocs(col);
    return qs.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  addFavor: async (favor) => {
    ensureInit();
    const col = collection(db, 'favors');
    const res = await addDoc(col, { ...favor, createdAt: serverTimestamp() });
    return res.id;
  },
  completeFavor: async (favorId, giverId, receiverId) => {
    ensureInit();
    const fdoc = doc(db, 'favors', favorId);
    await updateDoc(fdoc, { status: 'completed', completedAt: serverTimestamp(), giverId, receiverId });
    // credit logic simplified: +1 to giver, -1 to receiver
  },
  // Minimal groups (collection "groups")
  listGroups: async () => {
    ensureInit();
    const col = collection(db, 'groups');
    const qs = await getDocs(col);
    return qs.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  addGroup: async (group) => {
    ensureInit();
    const col = collection(db, 'groups');
    const res = await addDoc(col, { ...group, createdAt: serverTimestamp() });
    return res.id;
  },
};
