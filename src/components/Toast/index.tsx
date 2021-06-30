import toast, { Toaster, ToastBar } from 'react-hot-toast';
import styles from './styles.module.scss'

export function Toast() {
    return (
        <Toaster>
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <button
                                    className={styles.buttonClose}
                                    onClick={() => toast.dismiss(t.id)}>
                                    &#10006;
                                </button>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    )
}