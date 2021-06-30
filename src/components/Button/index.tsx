import { ButtonHTMLAttributes } from 'react'

import styles from './style.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    outline?: boolean
}

export function Button({ outline = false, ...props }: ButtonProps) {

    return (
        <button
            className={`${styles.button} ${outline && styles.outlined}`}
            {...props} />
    )

}