import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCx-WzyCo-VJbDSiJi2ThXaKLYs3przBaw",
  authDomain: "how-you-doin-f88fa.firebaseapp.com",
  projectId: "how-you-doin-f88fa",
  storageBucket: "how-you-doin-f88fa.appspot.com",
  messagingSenderId: "48326034041",
  appId: "1:48326034041:web:8c9ffeb1948c4cf84ccaa8",
  measurementId: "G-8TDH3N9LRZ"
};


!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const fetchLatestMessages = () => {
  return db.collection('Chatrooms')
    .get()
    .then(({docs}) => {
      return docs.map(doc => {
        const data = doc.data()
        const { id } = doc
        return {
          ...data,
          id
        }
      })
    })
}

export const createChatroom = (id) => {
  if (id) return db.collection('Chatrooms').doc(id).set({
    messages: [],
    participants: []
  })
  // else return db.collection('Chatrooms')
}

export const sendMessage = (message) => {
  const { author, content, date, id } = message
  return db.collection('Chatrooms').add({
    author,
    content,
    date,
    id
  })
}