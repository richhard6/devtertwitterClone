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

const db = firebase.firestore()

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
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

export const addDevit = ({ avatar, content, img, userId, username }) => {
  return db.collection('devits').add({
    avatar,
    content,
    img,
    userId,
    username,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}

export const deleteImage = (url) => {
  const pictureRef = firebase.storage().refFromURL(url)
  pictureRef.delete()
}
