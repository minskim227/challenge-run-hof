import { TeamContext } from "../context/TeamContext"
import { useContext } from "react"

export const useTeamContext = () => {

    const context = useContext(TeamContext)

    if (!context) {
        throw Error('useTeamContext must be used inside a TeamContextProvider')
    }

    return context
}