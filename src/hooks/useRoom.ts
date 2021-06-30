import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../contexts/AuthContext"
import { database } from "../services/firebase"

type QuestionType = {
    id: string,
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likeCount: number
    likeId: string | undefined
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likes: Record<string, {
        authorId: string
    }>
}>


export function useRoom(roomCode: string) {
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [endedAt, setEndedAt] = useState('')
    const [questions, setQuestions] = useState<QuestionType[]>([])

    // useEffect(() => {
    //     const roomRef = database.ref(`rooms/${roomCode}`)
    //     if (!roomRef) {
    //         toast('Ué, sala não encontrada!')
    //     }
    //     roomRef.on("child_added", room => {
    //         const databaseRoom = room.val()
    //         const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
    //         const parsedQuestions = Object.entries(firebaseQuestions).map((([key, value]) => ({
    //             id: key,
    //             content: value.content,
    //             author: value.author,
    //             isAnswered: value.isAnswered,
    //             isHighlighted: value.isHighlighted,
    //         })))
    //         setQuestions([...questions, ...parsedQuestions])
    //     })
    // }, [roomCode])
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomCode}`)

        // roomRef.once("value", room => {
        roomRef.on("value", room => {
            const databaseRoom = room.val()

            if (!databaseRoom) {
                setTitle('Sala não existe!')
                toast('Ué, sala não encontrada! Vamos te mandar pro inicio!')
                // setTimeout(() => {
                //     history.push('/')
                // }, 5000)
                return
            }

            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
            const parsedQuestions = Object.entries(firebaseQuestions).map((([key, value]) => ({
                id: key,
                content: value.content,
                author: value.author,
                isAnswered: value.isAnswered,
                isHighlighted: value.isHighlighted,
                likeCount: Object.values(value.likes ?? {}).length,
                likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
            })))
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
            setEndedAt(databaseRoom.endedAt)
        })

        return () => { roomRef.off("value") }

    }, [roomCode, user?.id])

    return { questions, title, endedAt }
}