import styles from 'styles/Chat.module.css'
import Image from 'next/image'

const Chat = ({ messages, nickname }) => {
    return (
        <div className={styles.container}>
            {messages.map(message => {
                return <div className={[styles.message_container, message.author === nickname ? styles.message_container_from_nickname : null].join(' ')} key={message.id}>
                    <span className={styles.profile_pict}>
                        <Image 
                            src="/profile_pict_placeholder.svg"
                            alt="placeholder for a profile picture"
                            width={30}
                            height={30}
                        />
                    </span>
                    <div className={[styles.message, message.author === nickname ? styles.message_from_nickname : null].join(' ')}>
                        <span className={styles.message_author}>from <strong>{message.author}</strong>:</span>
                        <span className={styles.message_content}>{message.content}</span>
                        <span className={[styles.message_date, message.author === nickname ? styles.message_date_from_nickname : null].join(' ')}>{message.date}</span>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Chat