import styles from 'styles/Chat.module.css'
import Message from 'components/message'
import { useEffect } from 'react'
const Chat = ({ messages, nickname }) => {
    useEffect(() => {
        console.log("change")
        
        console.log(document.getElementById('chat').lastElementChild.scrollIntoView())
    }, [messages])
    return (
        <div className={styles.container} id="chat">
            {
            messages.length
                ? messages.map(message => {
                return <Message message={message} key={message.id} nickname={nickname}/>
                })
                : <p>No messages yet</p>
            }
        </div>
    )
}

export default Chat