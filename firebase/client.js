import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCykIJQaBJX1IAcvubafBjeNbS5SKmLlN0',
  authDomain: 'devter-71b30.firebaseapp.com',
  projectId: 'devter-71b30',
  storageBucket: 'devter-71b30.appspot.com',
  messagingSenderId: '482702139006',
  appId: '1:482702139006:web:453f0c7b275d5e62a0c22f',
  measurementId: 'G-10DYN90E8P',
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
  // .then(mapUserFromFirebaseAuth); // seria igual a user => mapUserFromFirebaseAuth(user)
}
