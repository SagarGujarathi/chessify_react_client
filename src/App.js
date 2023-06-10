import './App.css'
import Piece from './components/Piece'
import { createContext, useReducer, useRef, useContext } from 'react'
import { STATETEMPLATE, COLOR, TYPES } from './constants'
import { handleReducer, handleResize } from './functions'
import { useEffect } from 'react'
import PlayerBox from './components/PlayerBox'
import FlagIcon from '@mui/icons-material/Flag';
import BalanceIcon from '@mui/icons-material/Balance';
import OnlinePlayers from './components/OnlinePlayers'
import RequestPlay from './components/RequestPlay'
import Login from './components/Login'
import { SocketContext } from './contexts/SocketProvider'
export const chessContext = createContext()
function App() {
  const [state, dispatch] = useReducer(handleReducer, STATETEMPLATE)
  const chessContainerRef = useRef()
  const { socket, gameState } = useContext(SocketContext)
  useEffect(() => {
    handleResize(chessContainerRef)
    window.addEventListener('resize', () => handleResize(chessContainerRef))
    return () => window.removeEventListener('resize', () => handleResize(chessContainerRef))
  }, [gameState.inGame])
  useEffect(() => {
    if (socket == null) return
    socket.on('InitGame', (data) => {
      if (data.black.socketId == socket.id) {
        dispatch({ type: TYPES.CHANGECHANCE, payload: COLOR.BLACK })
      }
    })
    socket.on('UserMove', (data) => {
      dispatch({ type: TYPES.CHANGECHANCE, payload: gameState.myDetails.color })
      dispatch({ type: TYPES.UPDATEBOARD, payload: data })
      dispatch({ type: TYPES.VERIFYPATHS, payload: null })
    })
  }, [socket, gameState])
  return (
    <>
      <chessContext.Provider value={{ chess: state, dispatch }}>
        <div className="main-container">
          <div className="left-main-container">
            {gameState.inGame &&
              <PlayerBox data={gameState.myDetails.color == COLOR.BLACK ? gameState.myDetails : gameState.opponentDetails} />
            }
            <div className="chess-container" ref={chessContainerRef}>
              {
                state.chess.map((row, i) => {
                  return row.map((piece, j) => {
                    return <Piece data={piece} index={{ i, j }} key={`${i}/${j}`} />
                  })
                })
              }
            </div>
            {gameState.inGame &&
              <PlayerBox data={gameState.myDetails.color == COLOR.WHITE ? gameState.myDetails : gameState.opponentDetails} />
            }
          </div>
          <div className="right-main-container">
            <OnlinePlayers />
            <div className="abort-draw-button-container">
              <button className='abort-button'>
                <FlagIcon sx={{ fontSize: '1.6rem' }} /> Abort
              </button>
              <button className='abort-button'>
                <BalanceIcon sx={{ fontSize: '1.6rem' }} /> Draw
              </button>
            </div>
          </div>
        </div>
        <RequestPlay />
        {!gameState.connect && <Login />}
      </chessContext.Provider>
    </>
  )
}

export default App


