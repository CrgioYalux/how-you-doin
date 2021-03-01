import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from 'styles/Chatroom.module.css'
import Chat from 'components/chat'
import Loader from 'components/loader'
import CreateMessage from 'components/createmessage'
import useSocket from 'hooks/useSocket'
import fetch from 'isomorphic-unfetch'

const Chatroom = (props) => {
    const [messages, setMessages] = useState(props.chat || [])
    const router = useRouter()
    const { id } = router.query
    const [nickname, setNickname] = useState(undefined)
    const socket = useSocket('chat:message', message => {
        setMessages(messages => [...messages, message])

    })
    const handleSubmit = (message, id) => {
        socket.emit('chat:message', {message, id})
        // setMessages(messages => [...messages, message])
    }

    useEffect(() => {
        const nickname = localStorage.getItem('nickname')
        setNickname(nickname)
    }, [])

    return(
        <div className={styles.container}>
            {nickname 
            ?   <>
                    <div className={styles.chat}>
                        <Chat messages={messages} nickname={nickname} />
                    </div>
                    <CreateMessage nickname={nickname} handleSubmit={handleSubmit} />
                </>
            : <Loader />
            }
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const data = await fetch(`http://localhost:3000/messages/${context.query.id}`)
    const chat = await data.json()
    return { props: {chat} }
}

export default Chatroom