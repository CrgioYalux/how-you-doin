const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const firebase = require('firebase/app')
require('firebase/firestore')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const nextHandler = nextApp.getRequestHandler()

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

const fetchLatestMessages = async (id) => {
    const req = db.collection('Chatrooms').doc(id);
    const doc = await req.get();
    return doc.data()
}

const sendMessage = async (message, id) => {
    const data = await fetchLatestMessages(id)
    const { chat } = data
    chat.push(message)
    return db.collection('Chatrooms').doc(id).update({chat})
}


io.on('connection', socket => {
    console.log('connected')

    socket.on('chat:message', async data => {
        const {message, id} = data
        console.log(message)
        await sendMessage(message, id)
        // socket.broadcast.emit('chat:message', message) Para enviar a todos menos a mi
        io.emit('chat:message', message)
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})

const getStoredMessages = async (id) => {
    const data = await fetchLatestMessages(id)
    const { chat } = data
    return chat
}

nextApp.prepare().then(() => {
    app.get('/messages/:id', (req, res) => {
        getStoredMessages(req.params.id).then(
            chat => {
                res.json(chat)
            }
        )
    })
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })
    server.listen(port, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:', port)
    })
})
