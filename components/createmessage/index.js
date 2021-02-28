import styles from 'styles/CreateMessage.module.css'
import Image from 'next/image'
import { getDate } from 'helpers/getDate'
import { sendMessage } from 'firebase/client'
import { useRouter } from 'next/router'

const CreateMessage = ({nickname, messageId}) => {
    const router = useRouter()
    const { id } = router.query

    const createMessage = async (e) => {
        e.preventDefault()            

        const date = getDate()
        const content = await e.target[0].value

        e.target[0].focus()
        e.target[0].value = ""

        await sendMessage({
            author: nickname,
            content,
            date,
            id: `${messageId}`
        }, id)

        router.reload()
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