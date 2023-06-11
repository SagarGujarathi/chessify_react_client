import { useContext, useEffect, useState } from 'react';
import '../css/PlayerBox.css'
import profile from '../images/profile.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { COLOR, PLAYERSTATE } from '../constants';
import { chessContext } from '../App';

function PlayerBox({ data }) {
    const { chess } = useContext(chessContext)
    const [time, setTime] = useState({ min: 10, sec: 0 })
    const [isActive, setIsActive] = useState(chess.chance == data.color)
    function handleTime() {
        setTime((prev) => {
            if (prev.sec === 0) {
                prev.sec = 59
                prev.min--
            }
            else {
                prev.sec--
            }
            return { ...prev }
        })
    }
    useEffect(() => {
        setIsActive(chess.chance == data.color)
    }, [chess.chance])
    useEffect(() => {
        let timer;
        if (isActive) {
            timer = setInterval(() => handleTime(), 1000)
        }
        return () => clearInterval(timer)
    }, [isActive])
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
                            backgroundColor: `${data.color == COLOR.BLACK ? isActive ? PLAYERSTATE.ACTIVEBLACK : PLAYERSTATE.INACTIVEBLACK : isActive ? PLAYERSTATE.ACTIVEWHITE : PLAYERSTATE.INACTIVEWHITE}`,
                            color: `${data.color == COLOR.BLACK ? isActive ? PLAYERSTATE.INACTIVEBLACK : PLAYERSTATE.ACTIVEBLACK : isActive ? PLAYERSTATE.INACTIVEWHITE : PLAYERSTATE.ACTIVEWHITE}`
                        }
                    }>
                        <AccessTimeIcon sx={{ fontSize: '1.5rem' }} />
                        <span>{`${time.min <= 9 ? `0${time.min}` : time.min}:${time.sec <= 9 ? `0${time.sec}` : time.sec}`}</span>
                    </div>
                </div>
            }
        </>
    )
}

export default PlayerBox