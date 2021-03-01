import {useEffect} from 'react'
import io from 'socket.io-client'

const socket = io()

const useSocket = (eventName, cb) => {
    useEffect(() => {
        socket.on(eventName, cb)

        return function useSocketCleanUp() {
            socket.off(eventName, cb)
        }
    }, [eventName, cb])
    
    return socket
}

export default useSocket