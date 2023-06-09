import { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../contexts/SocketProvider'
import '../css/RequestPlay.css'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
function Alert({ message, button }) {
    const socket = useContext(SocketContext)
    const [requestData, setRequestData] = useState('')
    useEffect(() => {
        if (socket == null) return
        socket.on('RequestPlay', (data) => setRequestData(data))
        return () => socket.off('RequestPlay', (data) => setRequestData(data))
    }, [socket])
    return (
        <>
            {
                requestData != '' &&
                <>
                    < div className="request-play-container" >
                        < span className="request-play-message" > {`${requestData.requestedPlayerName} is inviting you to play!`
                        }</span >
                        <div className="request-play-button-container">
                            <button className="request-play-button" style={{
                                backgroundColor: '#7FA650'
                            }}>
                                <CheckCircleOutlineIcon sx={{ fontSize: '2rem' }} />Accept
                            </button>
                            <button className="request-play-button" style={{ backgroundColor: '#B83230' }}>
                                <CloseIcon sx={{ fontSize: '2rem' }} />Reject
                            </button>
                        </div>
                    </div >
                </>
            }
        </>
    )
}

export default Alert