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

export const getCurrentUser = () => {
  const user = firebase.auth().currentUser

  return user
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithRedirect(githubProvider)
}

export const signInAnonymously = () => {
  return firebase.auth().signInAnonymously()
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
    likedBy: [],
  })
}

const mapDevitFromFirebaseToObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestDevits = (callback) => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map(mapDevitFromFirebaseToObject)

      //   const newDevits = docs.map(doc => mapDevitFromFirebaseToObject(doc))
      callback(newDevits)
    })
}

export const getDevit = (id, callback) => {
  return db
    .collection('devits')
    .doc(id)
    .onSnapshot((snap) => {
      const newDevits = mapDevitFromFirebaseToObject(snap)
      callback(newDevits)
    })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        return mapDevitFromFirebaseToObject(doc)
      })
    })
}

export const searchDevits = (content) => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .where('userId', '==', content)
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        return mapDevitFromFirebaseToObject(doc)
      })
    })
}

export const likeDevit = (devitId, userId) => {
  const devitsCollection = db.collection('devits').doc(devitId)

  devitsCollection
    .get()
    .then((doc) => {
      const data = doc.data()
      const { likesCount, likedBy } = data
      return { likesCount, likedBy }
    })
    .then((likes) => {
      const { likesCount, likedBy } = likes

      return updateLikeCountnArray(
        likesCount,
        likedBy,
        userId,
        devitsCollection
      )
    })
}

const updateLikeCountnArray = async (
  likesCount,
  likedBy,
  userId,
  devitsCollection
) => {
  const checkLike = likedBy.find((uid) => uid === userId)

  if (checkLike) {
    const substractLikeCount = await devitsCollection.update({
      likesCount: --likesCount,
    })

    const removeLike = likedBy.filter((id) => id !== userId)

    const removeFromLikedBy = await devitsCollection.update({
      likedBy: removeLike,
    })

    return { substractLikeCount, removeFromLikedBy }
  } else {
    const addLikeCount = await devitsCollection.update({
      likesCount: ++likesCount,
    })
    const addToLikedBy = await devitsCollection.update({
      likedBy: [...likedBy, userId],
    })
    return { addLikeCount, addToLikedBy }
  }
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
