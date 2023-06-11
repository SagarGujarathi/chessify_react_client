import { useContext } from 'react'
import '../css/Piece.css'
import { chessContext } from '../App'
import { CONSTANTS, TYPES } from '../constants'
import { SocketContext } from '../contexts/SocketProvider'
import { handleColor } from '../functions'
function Piece({ data, index }) {
    const { chess, dispatch } = useContext(chessContext)
    const { socket, gameState } = useContext(SocketContext)

    function handleClick() {
        if (data.backgroundColor === CONSTANTS.DANGERCOLOR || data.image === CONSTANTS.PATHIMAGE) {
            dispatch({ type: TYPES.SELECTMOVE, payload: { index: index, piece: data.piece, color: data.color, socket, opponentDetails: gameState.opponentDetails } })

        }
        else {
            dispatch({ type: TYPES.SELECTPIECE, payload: { index: index, piece: data.piece, color: data.color, myColor: gameState.myDetails.color } })
        }
    }
    return (
        <div
            className="chess-piece"
            onClick={() => handleClick()}
            style={
                {
                    backgroundImage: `url(${data.image})`,
                    backgroundColor: handleColor(data.backgroundColor, chess.selectedPiece, index),
                }
            }
        >
        </div>
    )
}

export default Piece