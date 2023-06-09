import './App.css'

import Piece from './components/Piece'
import { createContext, useReducer, useRef, useState } from 'react'
import { STATETEMPLATE, COLOR } from './constants'
import { handleReducer } from './functions'
import { useEffect } from 'react'
import PlayerBox from './components/PlayerBox'
import profile from './images/profile.png'
import SocketProvider from './contexts/SocketProvider'
import FlagIcon from '@mui/icons-material/Flag';
import BalanceIcon from '@mui/icons-material/Balance';
import OnlinePlayers from './components/OnlinePlayers'
import RequestPlay from './components/RequestPlay'
import Login from './components/Login'
export const chessContext = createContext()
function App() {
  const [players, setPlayers] = useState([])
  const [loginData, setLoginData] = useState('')
  const [state, dispatch] = useReducer(handleReducer, STATETEMPLATE)
  const chessContainerRef = useRef()
  function handleResize() {
    console.log('mew')
    chessContainerRef.current.style.gridTemplateColumns = `repeat(8, ${5}px)`
    chessContainerRef.current.style.gridTemplateRows = `repeat(8, ${5}px)`
    const height = Number(getComputedStyle(chessContainerRef.current).height.replace('px', ''))
    const width = Number(getComputedStyle(chessContainerRef.current).width.replace('px', ''))
    const rem = Number(getComputedStyle(document.documentElement).fontSize.replace('px', ''))
    if (window.outerWidth - 2 * rem <= 1200) {
      const minimum = Math.min(window.outerHeight - 3 * rem, window.outerWidth - 2 * rem)
      console.log(minimum)
      chessContainerRef.current.style.gridTemplateColumns = `repeat(8, ${minimum / 8}px)`
      chessContainerRef.current.style.gridTemplateRows = `repeat(8, ${minimum / 8}px)`
    }
    else {
      console.log(height, 'mewwww')
      chessContainerRef.current.style.gridTemplateColumns = `repeat(8, ${height / 8}px)`
      chessContainerRef.current.style.gridTemplateRows = `repeat(8, ${height / 8}px)`
    }

  }
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      <SocketProvider name={loginData}>
        <chessContext.Provider value={{ chess: state, dispatch }}>
          <div className="main-container">
            <div className="left-main-container">
              <PlayerBox profilePic={profile} playerName={'Sagar'} playerColor={COLOR.BLACK} isActive={true} />
              <div className="chess-container" ref={chessContainerRef}>
                {
                  state.chess.map((row, i) => {
                    return row.map((piece, j) => {
                      return <Piece data={piece} index={{ i, j }} key={`${i}/${j}`} />
                    })
                  })
                }
              </div>
              <PlayerBox profilePic={profile} playerName={'Sagar'} playerColor={COLOR.WHITE} isActive={true} />
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
          {
            loginData == '' && <Login callback={setLoginData} />
          }
        </chessContext.Provider>
      </SocketProvider>
    </>
  )
}

export default App


