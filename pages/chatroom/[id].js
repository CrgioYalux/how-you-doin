import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchLatestMessages } from 'firebase/client'

import styles from 'styles/Chatroom.module.css'

import Chat from 'components/chat'
import Loader from 'components/loader'
import CreateMessage from 'components/createmessage'

const Chatroom = ({chat}) => {
    const router = useRouter()
    const { id } = router.query
    const [messages, setMessages] = useState(chat)
    const [nickname, setNickname] = useState(undefined)

    // setInterval(() => {
    //     const getMessages = async (id) => {
    //         const data = await fetchLatestMessages(id)
    //         const { chat } = data
    //         return chat
    //     }
    //     getMessages(id).then(setMessages)
    //     // Risky risky
    // }, 1000);

    useEffect(() => {
        const nickname = localStorage.getItem('nickname')
        setNickname(nickname)
    }, [])

    return(
        <div className={styles.container}>
            {nickname 
            ?   <>
                    <div className={styles.chat}>
                        <Chat messages={messages} nickname={nickname}/>
                    </div>
                    <CreateMessage nickname={nickname} messageId={messages ? messages.length : 0} />
                </>
            : <Loader />
            }
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const data = await fetchLatestMessages(context.query.id)
    const { chat } = data
    return {props: {chat}}
}

export default Chatroom