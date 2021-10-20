import { VscGithubInverted } from 'react-icons/vsc'
import { useAuth } from '../../contexts/auth'

import styles from './styles.module.scss'


export function LoginBox() {
  const { signInUrl } = useAuth()

  return (
    <section className={styles.container}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} className={styles.githubLogo} />
        Entrar com o GitHub
      </a>
    </section>
  )
}