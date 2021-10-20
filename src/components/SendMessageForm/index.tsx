import { FormEvent, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAuth } from '../../contexts/auth'
import { api } from '../../services/api'

import styles from './styles.module.scss'

export function SendMessageForm() {
  const { user, signOut } = useAuth()
  const [message, setMessage] = useState('')

  const toastSuccess = () => toast.success("Mensagem enviada!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })

  const toastError = () => toast.warning("Erro no envio da mensagem!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  })

  const toastInfo = () => toast.info("Digite uma mensagem para ser enviada!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  })

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    if (!message.trim()) {
      toastInfo()
      return
    }

    try {
      await api.post('messages', { message: message })
      toastSuccess()
      setMessage('')

    } catch (error) {
      console.log(error)
      toastError()
    }

  }

  return (
    <section className={styles.container}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form
        onSubmit={handleSendMessage}
        className={styles.sendMessageForm}
      >
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={event => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit">
          Enviar Mensagem
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  )
}