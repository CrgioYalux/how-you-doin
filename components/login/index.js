import styles from 'styles/Login.module.css'
import {useState, useEffect} from 'react'
import useSocket from 'hooks/useSocket'

const Login = ({setLogin}) => {
    const [nickname, setNickname] = useState(0)
    const [chatroomID, setChatroomID] = useState(0)
    const [lastNickname, setLastNickname] = useState(undefined)

    useEffect(() => {
        if (localStorage) {
            const getLastNickname = localStorage.getItem('nickname')
            setLastNickname(getLastNickname)
        }
    }, [])

    const socket = useSocket('set:chatroom_id', id => {
        setChatroomID(id)
    })

    const handleChatroomIDChange = (e) => {
        setChatroomID(e.target.value)
    }

    const handleNicknameChange = (e) => {
        setNickname(e.target.value)
    }    

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        if (localStorage) localStorage.setItem("nickname", nickname)
        socket.emit('set:chatroom_id', chatroomID)
        setLogin({nickname, chatroomID})
        // createChatroom(chatroomID).then((exists) => {
        //     if(!exists){
        //     }
        // })
        // socket.emit('chat:message', id)
    }
    
    const checkInputs = () => {
        return !chatroomID.length || !nickname.length
    }

    return (
        <>
        <form className={styles.login} onSubmit={handleSubmitLogin}>
            <div className={styles.inputs}>
                <div>
                    <label className={styles.label}>nickname: </label>
                    <input placeholder={lastNickname ? `last used: ${lastNickname}` : null} className={styles.input} type="text" onChange={handleNicknameChange} autoFocus/>
                </div>
                <div>
                    <label className={styles.label}>chatroom's id: </label>
                    <input className={styles.input} type="text" onChange={handleChatroomIDChange}/>
                </div>
            </div>
            <button disabled={checkInputs()} className={checkInputs() ? styles.button_disabled : styles.button_not_disabled}>go</button>
        </form>
        </>
    )
}

export default Login
