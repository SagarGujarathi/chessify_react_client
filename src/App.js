import './App.css'

import Piece from './components/Piece'
import { createContext, useEffect, useReducer, useState } from 'react'
import { STATETEMPLATE } from './constants'
import { handleReducer } from './functions'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
export const chessContext = createContext()
function App() {
  const [players, setPlayers] = useState([])
  const [state, dispatch] = useReducer(handleReducer, STATETEMPLATE)

  useEffect(() => {
    function onConnect() {
      console.log(`Socket connected! id : ${socket.id}`)
    }
    function onPlayers(data) {
      setPlayers(data.filter(player => player != socket.id))
    }
    socket.on('connect', onConnect)
    socket.on('players', onPlayers)

    return () => {
      socket.on('connect', onConnect)
      socket.on('players', onPlayers)
    }
  }, [])
  function initGame(player) {
    socket.emit('start game', player)
  }
  return (
    <>
      <chessContext.Provider value={{ chess: state, dispatch }}>
        <div className="chess-container">
          {
            state.chess.map((row, i) => {
              return row.map((piece, j) => {
                return <Piece data={piece} index={{ i, j }} key={`${i}/${j}`} />
              })
            })
          }
          <div className="display-container">
            {
              players.map(player => {
                return <button onClick={() => initGame(player)} key={`${player}`} className='temp'>Connect: {player}</button>
              })
            }
          </div>
        </div>
      </chessContext.Provider>
    </>
  )
}

export default App