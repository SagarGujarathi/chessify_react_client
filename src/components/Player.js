import { useContext } from 'react'
import '../css/Player.css'
import { SocketContext } from '../contexts/SocketProvider';
function Player({ data }) {
    const socket = useContext(SocketContext)
    function requestPlay() {
        if (socket == null) return;
        socket.emit('RequestPlay', { ...data, requestedPlayerName: 'cat' })
    }
    return (
        <div className="player" onClick={requestPlay}>
            {data.playerName}
        </div>
    )
}

export default Player