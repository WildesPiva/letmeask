import { ButtonHTMLAttributes } from 'react'
import copyImage from '../../assets/images/copy.svg'
import styles from './styles.module.scss'

type RoomCodeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    code: string
}

export function RoomCode({ code, ...props }: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code)
    }

    return (
        <button className={styles.roomCode} onClick={copyRoomCodeToClipboard} {...props}>
            <div>
                <img src={copyImage} alt="Copy room code" />
            </div>
            <span> Sala #{code}</span>
        </button>
    )
}