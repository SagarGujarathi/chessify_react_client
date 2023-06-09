import { useContext, useEffect } from 'react';
import '../css/PlayerBox.css'
import { SocketContext } from '../contexts/SocketProvider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { COLOR } from '../constants';
const PLAYERSTATE = {
    ACTIVEWHITE: '#ECEEF0',
    INACTIVEWHITE: '#989795',
    ACTIVEBLACK: '#252422',
    INACTIVEBLACK: '#62605E'
}
function PlayerBox({ profilePic, playerName, playerColor, isActive }) {
    const socket = useContext(SocketContext)
    useEffect(() => {
        console.log(socket)
    }, [])
    return (
        <div className="player-box">
            <span className="player-container">
                <div className="player-image">
                    <img src={profilePic} />
                </div>
                <div className="player-details-container">
                    <span className="player-name">{playerName}</span>
                </div>
            </span>
            <div className="time-container" style={
                {
                    backgroundColor: `${playerColor == COLOR.BLACK ? isActive ? PLAYERSTATE.ACTIVEBLACK : PLAYERSTATE.INACTIVEBLACK : isActive ? PLAYERSTATE.ACTIVEWHITE : PLAYERSTATE.INACTIVEWHITE}`,
                    color: `${playerColor == COLOR.BLACK ? isActive ? PLAYERSTATE.INACTIVEBLACK : PLAYERSTATE.ACTIVEBLACK : isActive ? PLAYERSTATE.INACTIVEWHITE : PLAYERSTATE.ACTIVEWHITE}`
                }
            }>
                <AccessTimeIcon sx={{ fontSize: '1.5rem' }} />
                <span>8:01</span>
            </div>
        </div>

    )
}

export default PlayerBox