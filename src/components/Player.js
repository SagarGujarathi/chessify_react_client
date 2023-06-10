import { useContext } from 'react'
import '../css/Player.css'
import { SocketContext } from '../contexts/SocketProvider';
function Player({ data }) {

    const { socket, gameState } = useContext(SocketContext)
    function requestPlay() {
        if (socket == null) return;
        socket.emit('RequestPlay', { playerDetails: gameState.myDetails, opponentDetails: { socketId: data.socketId, name: data.name } })
    }
    return (
        <div className="player" onClick={requestPlay} key={`${data.socketId}`}>
            {data.name}
        </div>
    )
}

export default Player