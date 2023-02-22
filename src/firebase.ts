import { initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth"
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
// eslint-disable-next-line import/no-unresolved
import Filter from "bad-words"

const app = initializeApp({
  apiKey: "AIzaSyDo4Oz2EseI749sEOtyaXWkrIr1wKytnT4",
  authDomain: "vue-chat-674af.firebaseapp.com",
  projectId: "vue-chat-674af",
  storageBucket: "vue-chat-674af.appspot.com",
  messagingSenderId: "506956672039",
  appId: "1:506956672039:web:f41af235232347a975b202",
})

const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, "users"), where("uid", "==", user.uid))
    const docs = await getDocs(q)
    if (!docs.docs.length) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      })
    }
  } catch (err) {
    console.error(err)
  }
}

const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
  }
}

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (err) {
    console.error(err)
  }
}

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert("Password resetLink sent!")
  } catch (err) {
    console.error(err)
  }
}

const logout = () => signOut(auth)

const filter = new Filter()

export type MessageT = {id: string, userName: string, userPhotoURL: string, userId: string, text: string}

const useMessages = () => {
  const messagesCollection = collection(db, "messages")
  const messagesQuery = query(
    messagesCollection,
    orderBy("createdAt", "desc"),
    limit(100)
  )
  const [user] = useAuthState(auth)
  const [snapshot, loading, error] = useCollection(messagesQuery)
  const messages: MessageT[] =
        loading || error || !snapshot
          ? []
          : snapshot.docs
            .map((doc) => ({ 
              id: doc.id, 
              userName: "",
              userPhotoURL: "",
              userId: "",
              text: "",
              ...doc.data() }))
            .reverse()

  const sendMessage = (text: string) => {
    if (!user) return
    const { photoURL, uid, displayName } = user
    addDoc(messagesCollection, {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: filter.clean(text),
      createdAt: serverTimestamp(),
    })
  }

  return {
    messages,
    loadingMessages: loading,
    messagesError: error,
    sendMessage,
  }
}

export {
  auth,
  db,
  signInWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  useMessages,
}
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, collection, onSnapshot, serverTimestamp, addDoc, query, limit, orderBy } from 'firebase/firestore'

// import Filter from 'bad-words'
// // import { ref, onUnmounted, computed } from 'vue'
// import { useMemo, useEffect, useState } from "react";

// // Your web app's Firebase configuration
// initializeApp(
//     {
//     apiKey: "AIzaSyDo4Oz2EseI749sEOtyaXWkrIr1wKytnT4",
//     authDomain: "vue-chat-674af.firebaseapp.com",
//     projectId: "vue-chat-674af",
//     storageBucket: "vue-chat-674af.appspot.com",
//     messagingSenderId: "506956672039",
//     appId: "1:506956672039:web:f41af235232347a975b202"
//     }
// )

// const fAuth = getAuth()

// export function useAuth() {
//     const [user, setUser] = useState<any>(null)
//     const unsubscribe = fAuth.onAuthStateChanged(_user => {setUser(_user)})
//     // useEffect(() => {
//     //     return () => {
//     //         unsubscribe()
//     //     };
//     //   }, []);
//     const isLogin = useMemo(() => user !== null, [user])

//     const signIn = async () => {
//         const googleProvider = new GoogleAuthProvider()
//         await signInWithPopup(fAuth, googleProvider)
//     }
//     const signOut = () => fAuth.signOut()

//     return {user, isLogin, signIn, signOut}
// }

// const fFirestore = getFirestore()
// const messagesCollection = collection(fFirestore, 'messages')
// const messagesQuery = query(messagesCollection, orderBy("createdAt", 'desc'), limit(100))
// const filter = new Filter()

// export function useChat() {
//     const [messages, setMessages] = useState<any[]>([])
// const unsubscribe = onSnapshot(messagesQuery, snapshot => {
//     setMessages(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})).reverse())
// })
//     const {user, isLogin} = useAuth()
//     // useEffect(() => {
//     //     return () => {
//     //         unsubscribe()
//     //     };
//     //   }, []);

//     const sendMessage = (text: string) => {
//         if (!isLogin.valueOf) return
//         const {photoURL, uid, displayName} = user.current
//         addDoc(messagesCollection, {
//             userName: displayName,
//             userId: uid,
//             userPhotoURL: photoURL,
//             text: filter.clean(text),
//             createdAt: serverTimestamp()
//         })
//     }

//     return {messages, sendMessage}
// }
