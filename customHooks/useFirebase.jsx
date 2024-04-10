import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseConfig';
import {
  getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, where
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

export default function useFirebase(context) {

  // VARIABLES

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth(app);
  const collection_reference = collection(db, 'Todos')
  const provider = new GoogleAuthProvider();

  // FUNCTIONS

  async function initialize_database() {
    Auth_state_observer()
  }

  function Signup_user(email, password) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          resolve(user)
        })
        .catch((error) => {
          console.log(error.code, error.message)
          reject(error.code)
        });
    })
  }

  function Login_user(email, password) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          resolve(user)
        })
        .catch((error) => {
          console.log(error.code, error.message)
          reject(error.code)
        });

    })

  }

  function Google_Auth() {
    return new Promise((resolve, reject) => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          resolve(user)
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          reject(error.code)
          // ...
        });
    })

  }

  function LogOut_user() {
    return new Promise((resolve, reject) => {
      signOut(auth).then(() => {
        // Sign-out successful. 
        resolve('logout success')
      }).catch((error) => {
        reject(error.code)
      });
    })
  }

  function Auth_state_observer() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        context.setisLoggedIn(true)
        const object = {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photo: auth.currentUser.photoURL
        }
        context.setUserDetails(object)
        context.setLoader(true) // start loader
        await getTodos()
        context.setLoader(false) // stop loader
      } else {
        context.setisLoggedIn(false)
      }
    });
  }

  function insert_todo(desc) {
    const user = auth.currentUser;
    if (!user) {
      alert('Please login first!')
      return
    }
    const uid = user.uid
    let todo = {
      userID: uid,
      desc: desc,
      completed: false
    }
    return new Promise((resolve, reject) => {
      addDoc(collection_reference, todo)
        .then((docRef) => {
          console.log(docRef.id)
          resolve(docRef.id)
        })
        .catch(err => {
          reject(err.message)
        })
    })
  }

  function getTodos() {
    const user = auth.currentUser;
    if (!user) {
      alert('Please login first')
      return
    }
    const uid = user.uid
    const q = query(collection_reference, where('userID', '==', uid))
    return new Promise((resolve, reject) => {
      try {
        onSnapshot(q, (res) => {
          let newDataArray = []
          res.docs.forEach(doc => {
            newDataArray.push({ ...doc.data(), id: doc.id })
          })
          context.setTodos(newDataArray)
          context.setTodos2(newDataArray)
          resolve(newDataArray)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  function DeleteTodo(id) {
    const doc_reference = doc(db, 'Todos', id)
    return new Promise((resolve, reject) => {
      deleteDoc(doc_reference)
        .then(() => {
          resolve('Deletion Successful')
        })
        .catch(err => {
          reject(err.message)
        })
    })
  }

  function MarkTodo_as_complete(id, updatedData) {
    const doc_reference = doc(db, 'Todos', id)
    return new Promise((resolve, reject) => {
      updateDoc(doc_reference, updatedData)
        .then(() => {
          resolve('Updated Successfully')
        })
        .catch(err => {
          reject(err.message)
        })
    })
  }

  return { initialize_database, Signup_user, Login_user, LogOut_user, Google_Auth, insert_todo, getTodos, DeleteTodo, MarkTodo_as_complete }
}
