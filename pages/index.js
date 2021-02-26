import Head from 'next/head'
import styles from 'styles/Home.module.css'
import Login from 'components/login'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [login, setLogin] = useState(undefined)
  
  useEffect(() => {
    login && router.replace(`/chatroom/${login.chatroomID}`)
  }, [login])

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
        <Login setLogin={setLogin}/>
    </div>
  )
}
