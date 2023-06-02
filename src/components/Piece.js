import { useContext, useEffect } from 'react'
import '../css/Piece.css'
import { chessContext } from '../App'
import { CONSTANTS, TYPES } from '../constants'
function Piece({ data, index }) {
    const { chess, dispatch } = useContext(chessContext)
    return (
        <div
            className="chess-piece"
            onClick={() => dispatch({ type: TYPES.SELECTPIECE, payload: { index: index, piece: data.piece } })}
            style={
                {
                    backgroundImage: `url(${data.image})`,
                    backgroundColor: (chess.selectedPiece.index.i == index.i && chess.selectedPiece.index.j == index.j) ? CONSTANTS.SELECTCOLOR : (index.i + index.j) % 2 == 0 ? CONSTANTS.WHITE : CONSTANTS.GREEN,
                    gridColumn: `${index.j + 1}/${index.j + 2}`,
                    gridRow: `${index.i + 1}/${index.i + 2}`
                }
            }
        >
        </div>
    )
}

export default Piece