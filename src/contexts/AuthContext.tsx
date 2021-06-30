import { ReactNode, useState, useEffect } from 'react'
import { createContext, useContext } from 'react'
import { auth, firebase } from '../services/firebase'

type UserType = {
    id: string,
    name: string,
    avatar: string,
    email: string
}

type AuthContextType = {
    user: UserType | undefined,
    signInWithGoogle: () => Promise<void>
}

type AuthContextProviderType = {
    children: ReactNode
}

const AuthContext = createContext({} as AuthContextType)

const AuthContextProvider = ({ children }: AuthContextProviderType) => {
    const [user, setUser] = useState<UserType>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, photoURL, uid } = user

                if (!displayName || !photoURL || !email) {
                    throw new Error("Missing information from Google Acount");
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    email
                })
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const signInWithGoogle = async () => {
        const authProviderGoogle = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(authProviderGoogle)

        if (result.user) {
            const { displayName, email, photoURL, uid } = result.user

            if (!displayName || !photoURL || !email) {
                throw new Error("Missing information from Google Acount");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                email
            })
        }

    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export {
    AuthContextProvider,
    useAuthContext
}