import styles from './App.module.scss'
import { LoginBox } from './components/LoginBox'
import { MessagesList } from './components/MessagesList'
import { SendMessageForm } from './components/SendMessageForm'
import { useAuth } from './contexts/auth'

export function App() {
  const { user } = useAuth()

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessagesList />
      {user
        ? <SendMessageForm />
        : <LoginBox />
      }

    </main>
  )
}

