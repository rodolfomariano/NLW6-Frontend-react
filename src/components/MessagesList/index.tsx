import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { api } from '../../services/api'

import styles from './styles.module.scss'
import logoImg from '../../assets/logo.svg'

interface Message {
  id: string
  text: string
  user: {
    name: string
    avatar_url: string
  }
}

const messagesQueue: Message[] = []

const socket = io('http://localhost:3333')

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage)
})

export function MessagesList() {
  const [message, setMessage] = useState<Message[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessage(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))

        messagesQueue.shift()
      }
    }, 3000)
  }, [])

  useEffect(() => {
    api.get<Message[]>('messages/last3').then(response => {
      setMessage(response.data)
    })

  }, [])

  return (
    <section className={styles.container}>
      <img src={logoImg} alt="Logo DoWhile 2021" />

      <ul className={styles.messageList}>

        {message.map(item => (
          <li className={styles.message} key={item.id}>
            <p className={styles.messageContent}>
              {item.text}
            </p>

            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={item.user.avatar_url} alt="Foto do usuário" />
              </div>
              <span>{item.user.name}</span>
            </div>
          </li>

        ))

        }


      </ul>
    </section>
  )
}