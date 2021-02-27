import styles from 'styles/Chat.module.css'
import Message from 'components/message'

const Chat = ({ messages, nickname }) => {
    return (
        <div className={styles.container}>

            {
            messages
                ? messages.map(message => {
                return <Message message={message} key={message.id} nickname={nickname}/>
                })
                : <p>No messages yet</p>
            }
        </div>
    )
}

export default Chat