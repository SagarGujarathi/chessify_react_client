import './App.css'

import Piece from './components/Piece'
import { createContext, useReducer } from 'react'
import { STATETEMPLATE, TYPES } from './constants'
export const chessContext = createContext()
function App() {
  function handleReducer(state, { type, payload }) {
    switch (type) {
      case TYPES.SELECTPIECE:
        return { ...state, selectedPiece: payload }
      case TYPES.SELECTMOVE:
        return { ...state, selectedMove: payload }
    }
  }
  const [state, dispatch] = useReducer(handleReducer, STATETEMPLATE)
  return (
    <chessContext.Provider value={{ chess: state, dispatch }}>
      <div className="chess-container">
        {
          state.chess.map((row, i) => {
            return row.map((piece, j) => {
              return <Piece data={piece} index={{ i, j }} />
            })
          })
        }
        <div className="display-container"></div>
      </div>
    </chessContext.Provider>
  )
}

export default App