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

export const fetchLatestMessages = async (id) => {
  const req = db.collection('Chatrooms').doc(id);
  const doc = await req.get();
  return doc.data()
}

export const createChatroom = (id) => {
  if (db.collection('Chatrooms').doc(id)) console.log("Existe!")
  // if (id) return db.collection('Chatrooms').doc(id).set({
  //   chat: [],
  // })
  // else return db.collection('Chatrooms')
}

export const sendMessage = async (message, id) => {
  const data = await fetchLatestMessages(id)
  const { chat } = data
  chat.push(message)
  return db.collection('Chatrooms').doc(id).update({chat})
}