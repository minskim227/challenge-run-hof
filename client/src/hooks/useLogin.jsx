import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from "axios"

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useAuthContext()

    const login = async (username, password) => {

        setError(null)
        setIsLoading(true)

        try {
            const response = await axios.post('https://challenge-run-hof.onrender.com/api/user/login', {username, password})
            dispatch({type: 'LOGIN', payload: response})
            localStorage.setItem('user', JSON.stringify(response))
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            if (error.response) {
                console.log(error.response)
                setError(error.response.data.error)
            } else {
                console.log(`Error: ${error.message}`)
                setError(error.message)
            }
        }
    }

    return { login, error, isLoading}
}