import { useRouter } from 'next/router'
import styles from 'styles/Chatroom.module.css'
import Chat from 'components/chat'
import { useEffect, useState } from 'react'

const Chatroom = () => {
    const router = useRouter()
    const { id } = router.query
    const [nickname, setNickname] = useState(undefined)

    useEffect(() => {
        if (localStorage) setNickname(localStorage.getItem('nickname'))
    }, [])

    const msjs = [
        {
            author: "Crgio",
            content: "jajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajajaja",
            date: "12:07",
            id: "0"
        },
        {
            author: "karl",
            content: "Tobien",
            date: "12:10",
            id: "1"
        },
        {
            author: "Michael",
            content: "u all dumb fucks",
            date: "12:14",
            id: "2"
        },
    ]
    
    return(
        <div className={styles.container}>
            <Chat messages={msjs} nickname={nickname}/>
        </div>
    )
}

// hacer pag chatroom

export default Chatroom