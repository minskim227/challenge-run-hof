import { useEffect } from "react"
import { useTeamContext } from "../hooks/useTeamContext"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from 'axios'

import TeamCard from "../components/TeamCard"
import NewTeamForm from "../components/NewTeamForm"
import SpunDown from "../components/SpunDown"

function Home() {

    const { teams, dispatch } = useTeamContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('https://challenge-run-hof.onrender.com/api/teams')
                dispatch({type: 'SET_TEAMS', payload: response.data})
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                } else {
                    console.log(`Error: ${error.message}`)
                }
            }
        }
        fetchTeams()
    },[teams && teams.length])

    return (
        <>
            {teams ? (
                <div className="max-w-6xl p-4 mx-auto my-0 flex justify-center">
                    <div className={user ? "w-2/3" : "w-4/5"}>
                        {teams && teams.map(team => (
                            <TeamCard key={team._id} team={team} />
                        ))}
                    </div>
                    {user ? (
                        <div className="w-2/5">
                            <NewTeamForm />
                        </div>
                        ) : null
                    }
                </div>
            ) : (
                <div className="max-w-6xl p-4 mx-auto my-0 flex justify-center">
                    <SpunDown />
                </div>
            )}
        </>
    )
}

export default Home