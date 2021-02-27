import styles from 'styles/CreateMessage.module.css'
import Image from 'next/image'
import { getDate } from 'helpers/getDate'
import { sendMessage } from 'firebase/client'
import { useRouter } from 'next/router'

const CreateMessage = ({nickname, messageId}) => {
    const router = useRouter()
    const { id } = router.query

    const createMessage = (e) => {
        e.preventDefault()    
        const date = getDate()
        const content = e.target[0].value
        sendMessage({
            
            author: nickname,
            content,
            date,
            id: `${messageId}`
        }, id)
        e.target[0].value = ""
        e.target[0].focus()
    }

    return (
        <div className={styles.container}>
            <form onSubmit={createMessage} className={styles.message}>
                <textarea className={styles.message_input} type="text" autoFocus/>
                <button className={styles.create_message_button}>
                    <Image 
                        src="/send2.svg"
                        alt="send button"
                        width={25}
                        height={25}
                    />
                </button>
            </form>
        </div>
    )
}

export default CreateMessage