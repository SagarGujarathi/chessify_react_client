import { useContext } from 'react'
import '../css/Piece.css'
import { chessContext } from '../App'
import { CONSTANTS, TYPES } from '../constants'
function Piece({ data, index }) {
    const { chess, dispatch } = useContext(chessContext)
    function handleColor(backgroundColor) {
        if (backgroundColor !== undefined && backgroundColor !== null) {
            return backgroundColor
        }
        if ((chess.selectedPiece.index.i === index.i && chess.selectedPiece.index.j === index.j)) {
            return CONSTANTS.SELECTCOLOR
        }
        else if ((index.i + index.j) % 2 === 0) {
            return CONSTANTS.WHITE
        }
        else {
            return CONSTANTS.GREEN
        }
    }
    function handleClick() {
        if (data.backgroundColor === CONSTANTS.DANGERCOLOR || data.image === CONSTANTS.PATHIMAGE) {
            dispatch({ type: TYPES.SELECTMOVE, payload: { index: index, piece: data.piece, color: data.color } })
        }
        else {
            dispatch({ type: TYPES.SELECTPIECE, payload: { index: index, piece: data.piece, color: data.color } })
        }
    }
    return (
        <div
            className="chess-piece"
            onClick={() => handleClick()}
            style={
                {
                    backgroundImage: `url(${data.image})`,
                    backgroundColor: handleColor(data.backgroundColor),
                }
            }
        >
        </div>
    )
}

export default Piece