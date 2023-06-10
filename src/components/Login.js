import '../css/Login.css'
import { SocketContext } from '../contexts/SocketProvider'
import { useContext } from 'react'
import { TYPES } from '../constants'
function Login() {
    const { gameDispatch, gameState } = useContext(SocketContext)

    return (
        <div className="login-container">
            <span className="login-heading">Login</span>
            <input
                type="text"
                className='login-input'
                name='name'
                placeholder='Enter your Name...'
                onChange={(e) => gameDispatch({ type: TYPES.SETMYNAME, payload: e.target.value })}
                value={gameState.myDetails.name}
            />
            <button
                className="login-button"
                onClick={() => gameDispatch({ type: TYPES.LOGIN, payload: true })}
            >
                Submit</button>
        </div >
    )
}

export default Login