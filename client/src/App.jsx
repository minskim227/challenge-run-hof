import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"

function App() {

  const { user } = useAuthContext()

  return (
    <div className="bg-stone-100 min-h-screen">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" /> } />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
  
}
export default App
