import './App.css'

import Piece from './components/Piece'
import { createContext, useEffect, useReducer, useState } from 'react'
import { STATETEMPLATE } from './constants'
import { handleReducer } from './functions'
import { io } from 'socket.io-client'
const socket = io.connect('http://localhost:3000/')
export const chessContext = createContext()
function App() {
  const [players, setPlayers] = useState([])
  const [state, dispatch] = useReducer(handleReducer, STATETEMPLATE)

  function handlePlayersData(data) {
    setPlayers(data.filter(s => s != socket.id))
  }
  function initGame(player) {
    console.log('meow')
    socket.emit('in', { player })
  }
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to id: ', socket.id)
    })
    socket.on('players', data => handlePlayersData(data.players))
  }, [socket])

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
                return <button onClick={() => { initGame(player) }} key={`${player}`} className='temp'>Connect: {player}</button>
              })
            }
          </div>
        </div>
      </chessContext.Provider>
    </>
  )
}

export default App