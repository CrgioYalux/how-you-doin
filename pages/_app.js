import '../styles/globals.css'
import io from 'socket.io-client'
import {useState,useEffect} from 'react'

function MyApp({ Component, pageProps }) {
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    console.log("socket is ", socket)
    const socket = io()
    setSocket(socket)
  }, [])
  return <Component {...pageProps} socket={socket}/>
}

export default MyApp