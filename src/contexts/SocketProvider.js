import { createContext, useState, useEffect, useReducer } from 'react'
import { io } from 'socket.io-client'
import { COLOR, TYPES } from '../constants'
export const SocketContext = createContext()
function SocketProvider({ children }) {
    function getId() {
        const id = localStorage.getItem('roomId')
        if (id == null) {
            const newId = `${Math.ceil(Math.random() * 1e9)}`
            localStorage.setItem('id', newId)
            return newId
        }
        return id
    }
    function handleGameState(state, { type, payload }) {
        switch (type) {
            case TYPES.SETMYNAME:
                return { ...state, myDetails: { ...state.myDetails, name: payload } }
            case TYPES.SETMYPHOTO:
                return { ...state, myDetails: { ...state.myDetails, profilePic: payload } }
            case TYPES.LOGIN:
                return { ...state, connect: payload }
            case TYPES.OPPONENTDETAILS:
                return { ...state, opponentDetails: payload }
            case TYPES.SETGAMEROOMID:
                return { ...state, gameRoomId: payload }
            case TYPES.SETSOCKETID:
                return { ...state, myDetails: { ...state.myDetails, socketId: payload } }
            case TYPES.SETMYCOLOR:
                return { ...state, myDetails: { ...state.myDetails, color: payload } }
            case TYPES.SETINGAME:
                return { ...state, inGame: payload }
            default:
                return { ...state }
        }
    }
    const GAMESTATETEMPLATE = {
        inGame: false,
        connect: false,
        gameRoomId: '',
        myDetails: {
            name: '',
            profilePic: '',
            roomId: getId(),
            color: '',
            socketId: null
        },
        opponentDetails: {
            name: '',
            profilePic: '',
            color: '',
            socketId: null
        }
    }
    const [socket, setSocket] = useState()
    const [gameState, gameDispatch] = useReducer(handleGameState, { ...GAMESTATETEMPLATE })
    function handleInitGame(data) {
        console.log('meow')
        if (data.black.socketId != socket.id) {
            gameDispatch({ type: TYPES.OPPONENTDETAILS, payload: { ...data.black, color: COLOR.BLACK } })
            gameDispatch({ type: TYPES.SETMYCOLOR, payload: COLOR.WHITE })
        }
        else {
            gameDispatch({ type: TYPES.OPPONENTDETAILS, payload: { ...data.white, color: COLOR.WHITE } })
            gameDispatch({ type: TYPES.SETMYCOLOR, payload: COLOR.BLACK })
        }
        gameDispatch({ type: TYPES.SETINGAME, payload: true })
        gameDispatch({ type: TYPES.SETGAMEROOMID, payload: data.gameRoomId })
    }
    useEffect(() => {
        if (gameState.connect !== true) return;

        const newSocket = io('http://localhost:3000', { query: gameState.myDetails })
        newSocket.on('connect', () => {
            gameDispatch({ type: TYPES.SETSOCKETID, payload: newSocket.id })
        })
        setSocket(newSocket)
        return () => {
            newSocket.close()
        }
    }, [gameState.connect])
    useEffect(() => {
        if (socket == null) return
        socket.on('InitGame', (data) => handleInitGame(data))
    }, [socket])

    return (
        <SocketContext.Provider value={{ socket, gameDispatch, gameState }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider