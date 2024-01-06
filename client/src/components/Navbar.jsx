import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout" 
import { useAuthContext } from "../hooks/useAuthContext"

function Navbar() {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => { logout() }

    return(
        <div className="bg-indigo-600 text-white">
            <header className="mx-auto my-0 px-12 py-6 flex place-items-center justify-between">
                <Link to="/" className="text-3xl">Pokemon Challenge Run Hall of Fame</Link>
                <nav>
                    {user ? (
                        <div className="flex items-center gap-6">
                            <span className="text-xl font-semibold">{user.data.username}</span>
                            <button
                                className="border-2 border-white px-5 py-2 text-lg text-center rounded-md cursor-pointer"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex align-middle gap-6 py-2.5 text-lg">
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </header>
        </div>
    )
}

export default Navbar