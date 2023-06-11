import { createContext, useState, useEffect, useReducer } from 'react'
import { io } from 'socket.io-client'
import { COLOR, TYPES, GAMESTATETEMPLATE } from '../constants'
import { handleGameState } from '../functions'
export const SocketContext = createContext()
function SocketProvider({ children }) {

    const [socket, setSocket] = useState()
    const [gameState, gameDispatch] = useReducer(handleGameState, { ...GAMESTATETEMPLATE })

    function handleInitGame(data) {
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
        socket.on('StopGamw', (data) => {
            alert(`${data} is disconnected! Game draw`)
            socket.leave(gameState.gameRoomId)

        })
    }, [socket])

    return (
        <SocketContext.Provider value={{ socket, gameDispatch, gameState }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider