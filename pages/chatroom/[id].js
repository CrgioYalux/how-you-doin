import { useRouter } from 'next/router'
import styles from 'styles/Chatroom.module.css'
import Chat from 'components/chat'
import { useEffect, useState } from 'react'
import { fetchLatestMessages } from 'firebase/client'
import Loader from 'components/loader'

const Chatroom = () => {
    const router = useRouter()
    const { id } = router.query
    const [nickname, setNickname] = useState(undefined)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getMessages = async () => {
            let [data] = await fetchLatestMessages()
            let { chat } = data
            return chat
        }
        getMessages().then(setMessages)
    }, [])

    useEffect(() => {
        if (localStorage) setNickname(localStorage.getItem('nickname'))
    }, [])
    
    return(
        <div className={styles.container}>
            {messages 
                ? <Chat messages={messages} nickname={nickname}/>
                : <Loader />
            }
        </div>
    )
}

export default Chatroom