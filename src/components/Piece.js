import { useContext, useEffect } from 'react'
import '../css/Piece.css'
import { chessContext } from '../App'
import { CONSTANTS, TYPES } from '../constants'
function Piece({ data, index }) {
    const { chess, dispatch } = useContext(chessContext)
    function handleColor(backgroundColor) {
        if (backgroundColor != null) {
            return backgroundColor
        }
        if ((chess.selectedPiece.index.i == index.i && chess.selectedPiece.index.j == index.j)) {
            return CONSTANTS.SELECTCOLOR
        }
        else if ((index.i + index.j) % 2 == 0) {
            return CONSTANTS.WHITE
        }
        else {
            return CONSTANTS.GREEN
        }
    }
    return (
        <div
            className="chess-piece"
            onClick={() => dispatch({ type: TYPES.SELECTPIECE, payload: { index: index, piece: data.piece, color: data.color } })}
            style={
                {
                    backgroundImage: `url(${data.image})`,
                    backgroundColor: handleColor(data.backgroundColor),
                    gridColumn: `${index.j + 1}/${index.j + 2}`,
                    gridRow: `${index.i + 1}/${index.i + 2}`
                }
            }
        >
        </div>
    )
}

export default Piece