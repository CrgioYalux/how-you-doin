import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchLatestMessages } from 'firebase/client'

import styles from 'styles/Chatroom.module.css'

import Chat from 'components/chat'
import Loader from 'components/loader'
import CreateMessage from 'components/createmessage'

const Chatroom = () => {
    
    const router = useRouter()
    const { id } = router.query
    const [nickname, setNickname] = useState(undefined)
    const [messages, setMessages] = useState(undefined)

    
    const getMessages = async (id) => {
        const data = await fetchLatestMessages(id)
        const { chat } = data
        return chat
    }

    useEffect(() => {
        getMessages(id).then(setMessages)
        
    }, [])
    
    useEffect(() => {
        if (localStorage) setNickname(localStorage.getItem('nickname'))
    }, [])


    return(
        <div className={styles.container}>
            <div className={styles.chat}>
                {messages 
                    ? <Chat messages={messages} nickname={nickname}/>
                    : <Loader />
                }
            </div>
            <CreateMessage nickname={nickname} messageId={messages ? messages.length : 0}/>
        </div>
    )
}

export default Chatroom