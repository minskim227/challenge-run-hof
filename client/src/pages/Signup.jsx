import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {

        e.preventDefault()

        await signup(username, password)
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>

            <h2 className="text-2xl mb-3">Sign up</h2>

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

            <button className="submit-button" disabled={isLoading}>Sign Up</button>
            {error &&
                <div className="error">
                    {error}
                </div>
            }
        </form>
    )
}

export default Signup