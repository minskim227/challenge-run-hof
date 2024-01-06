import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {

        e.preventDefault()

        await login(username, password)
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>

            <h2 className="text-2xl mb-3">Log In</h2>

            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button className="submit-button" disabled={isLoading}>Log In</button>
            {error &&
                <div className="error">
                    {error}
                </div>
            }
        </form>
    )
}

export default Login