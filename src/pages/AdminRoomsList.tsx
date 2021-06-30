import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Toast } from '../components/Toast'
import logoImage from '../assets/images/logo.svg'
import styles from '../styles/room.module.scss'


export function AdminRoomsList() {
    const history = useHistory()
    const { user } = useAuthContext()


    return (
        <div className={styles.pageRoom}>
            <Toast />
            <header>
                <div className={styles.content}>
                    <img src={logoImage} alt="Logo Let Me Ask" onClick={() => history.push('/')} />
                    <div>
                        {/* <img src={user?.avatar} alt="User" /> */}
                        {user?.name}
                    </div>
                </div>
            </header>
            <main>
                <h1>Todas as suas salas</h1>
            </main>
        </div>
    )
}