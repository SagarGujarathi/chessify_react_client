import { useContext, createContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = createContext()
function SocketProvider({ name, children }) {
    function getId() {
        const id = localStorage.getItem('id')
        if (id == null) {
            const newId = `${Math.ceil(Math.random() * 1e9)}`
            localStorage.setItem('id', newId)
            return newId
        }
        return id
    }
    const [socket, setSocket] = useState()
    useEffect(() => {
        console.log(name)
        if (name != '') {
            const newSocket = io('http://localhost:3000', { query: { name, id: getId(), isAvailable: true } })
            newSocket.on('connect', () => {
                console.log(`Connected! ID: ${newSocket.id}`)
            })
            setSocket(newSocket)
            return () => { newSocket.close() }
        }
    }, [name])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider