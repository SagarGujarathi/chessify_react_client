import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../contexts/SocketProvider'
import Player from './Player.js'
import '../css/OnlinePlayers.css'
function OnlinePlayers() {
    const socket = useContext(SocketContext)
    const [players, setPlayers] = useState([])
    useEffect(() => {
        if (socket == null) return
        socket.on('OnlinePlayers', (data) => setPlayers(data.filter(s => s.id !== socket.id)))
        console.log(players)
        return () => socket.off('OnlinePlayers', (data) => setPlayers(data.filter(s => s.id !== socket.id)))
    }, [socket])
    return (
        <div className="online-player-container">
            {
                players.map(data => <Player data={data} />)
            }
        </div>
    )
}

export default OnlinePlayers