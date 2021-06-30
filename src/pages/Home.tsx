import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { useHistory, } from 'react-router-dom'
import { database } from '../services/firebase'

import { Button } from '../components/Button'
import { Toast } from '../components/Toast'
import illustrationImage from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg'
import googleIconImage from '../assets/images/google-icon.svg'

import { useAuthContext } from '../contexts/AuthContext'

import styles from '../styles/auth.module.scss'


export function Home() {
    const history = useHistory()
    const { signInWithGoogle, user } = useAuthContext()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {

        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
    }


    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()


        if (roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            toast('Ops, a sala que digitou não existe!')
            return
        }

        if (roomRef.val().endedAt) {
            toast('A sala ja foi encerrada!')
            return
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div className={styles.pageAuth}>
            <Toast />

            <aside>
                <img src={illustrationImage} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo-real</p>
            </aside>
            <main>
                <div className={styles.mainContent}>
                    <img src={logoImage} alt="Logo do Let Me Ask" />
                    {
                        (user) ? (
                            <button className={styles.createRoomButton} onClick={handleCreateRoom}>
                                <img src={user.avatar} alt="User" />
                                {user.name} clique aqui para criar sua sala
                                <img src={googleIconImage} alt="Logo do Google" />
                            </button>
                        ) : (
                            <button className={styles.createRoomButton} onClick={handleCreateRoom}>
                                <img src={googleIconImage} alt="Logo do Google" />
                                Crie sua sala com o Google
                            </button>

                        )
                    }

                    <div className={styles.separator}>Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
