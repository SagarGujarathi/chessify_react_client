import { useContext } from 'react';
import '../css/PlayerBox.css'
import profile from '../images/profile.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { COLOR } from '../constants';
import { chessContext } from '../App';
const PLAYERSTATE = {
    ACTIVEWHITE: '#ECEEF0',
    INACTIVEWHITE: '#989795',
    ACTIVEBLACK: '#252422',
    INACTIVEBLACK: '#62605E'
}
function PlayerBox({ data }) {
    const { chess } = useContext(chessContext)
    return (
        <>
            {
                <div className="player-box">
                    <span className="player-container">
                        <div className="player-image">
                            <img src={profile} />
                        </div>
                        <div className="player-details-container">
                            <span className="player-name">{data.name}</span>
                        </div>
                    </span>
                    <div className="time-container" style={
                        {
                            backgroundColor: `${data.color == COLOR.BLACK ? data.color == chess.chance ? PLAYERSTATE.ACTIVEBLACK : PLAYERSTATE.INACTIVEBLACK : data.color == chess.chance ? PLAYERSTATE.ACTIVEWHITE : PLAYERSTATE.INACTIVEWHITE}`,
                            color: `${data.color == COLOR.BLACK ? data.color == chess.chance ? PLAYERSTATE.INACTIVEBLACK : PLAYERSTATE.ACTIVEBLACK : data.color == chess.chance ? PLAYERSTATE.INACTIVEWHITE : PLAYERSTATE.ACTIVEWHITE}`
                        }
                    }>
                        <AccessTimeIcon sx={{ fontSize: '1.5rem' }} />
                        <span>8:01</span>
                    </div>
                </div>
            }
        </>
    )
}

export default PlayerBox