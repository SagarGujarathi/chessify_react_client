import { useState } from 'react'
import '../css/Login.css'
function Login({ callback }) {
    const [name, setName] = useState('')
    return (
        <div className="login-container">
            <span className="login-heading">Login</span>
            <label htmlFor="name" className='login-input-label'>
                <input
                    type="text"
                    className='login-input'
                    name='name'
                    placeholder='Enter your Name...'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <button
                className="login-button"
                onClick={() => {
                    if (name == '') return
                    callback(name)
                }}
            >
                Submit</button>
        </div >
    )
}

export default Login