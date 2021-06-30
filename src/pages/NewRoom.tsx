import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { database } from '../services/firebase'
import { useAuthContext } from '../contexts/AuthContext'

import { Button } from '../components/Button'

import illustrationImage from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg'

import styles from '../styles/auth.module.scss'

export function NewRoom() {
    const history = useHistory()
    const { user } = useAuthContext()
    const [newRoomName, setNewRoomName] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoomName.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoomName,
            authorId: user?.id
        })

        history.push(`/admin/rooms/${firebaseRoom.key}`)

    }

    return (
        <div className={styles.pageAuth}>
            <aside>
                <img src={illustrationImage} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo-real</p>
            </aside>
            <main>
                <div className={styles.mainContent}>
                    <img src={logoImage} alt="Logo do Let Me Ask" />
                    {
                        (user) && (
                            <div className={styles.userContent}>
                                <img src={user.avatar} alt="User" />
                                <h1>{user.name}</h1>
                            </div>
                        )
                    }

                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            value={newRoomName}
                            onChange={event => setNewRoomName(event.target.value)}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
