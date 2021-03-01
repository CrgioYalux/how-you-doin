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

// import App from 'next/app'
// import React from 'react'
// import io from 'socket.io-client'

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {
//     let pageProps = {}
//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx)
//     }
     
//     return { pageProps }
//   }
//   state = {
//     socket: null,
//   }
//   componentDidMount() {
//     const socket = io()
//     this.setState({ socket })
//   }
//   componentWillMount() {
//     this.state.socket.close()
//   }

//   render() {
//     const { Component, pageProps } = this.props
//     return <Component {...pageProps} socket={this.props.socket}/>
//   }
// }

// export default MyApp