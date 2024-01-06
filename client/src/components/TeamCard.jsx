import { useTeamContext } from "../hooks/useTeamContext"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from "axios"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useState } from "react"

function TeamCard({ team }) {

    const { dispatch } = useTeamContext()
    const { user } = useAuthContext()

    const [urls, setUrls] = useState([])

    useEffect(() => {

        const fetchUrls = async () => {

            try {
                const imgurls = await Promise.all(
                    team.members.map(async (member) => {
                        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${member}`)
                        return response.data.sprites.front_default
                    })
                )
                setUrls(imgurls)

            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                } else {
                    console.log(`Error: ${error.message}`)
                }
            }
        }
        fetchUrls()
    },[])

    const isSwitch = (game) => {

        const switchGames = ['Sword', 'Shield', 'Brilliant Diamond', 'Shining Pearl', 'Scarlet', 'Violet']

        if (switchGames.includes(game)) {
            return true
        }
    }

    const handleDelete = async () => {

        if (!user) {
            return
        }

        try {
            const response = await axios.delete(`https://challenge-run-hof.onrender.com/api/teams/${team._id}`, {
                data: { team },
                headers : {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })
            dispatch({type: 'DELETE_TEAM', payload: response.data})
        } catch (error) {
            if (error.response) {
                console.log(error.response)
            } else {
                console.log(`Error: ${error.message}`)
            }
        }
    }

    return (
        <div className="bg-white rounded-md mx-auto my-5 p-5 shadow-md relative">
            <img className={isSwitch(team.game) ? 'switch' : 'nonSwitch'} src={`/images/${team.game}.png`} alt={team.game} />
            <div className={isSwitch(team.game) ? 'flex justify-center pt-4 mb-16' : "flex justify-center pt-2 mb-10"}>
                <h2 className="text-xl font-semibold">{team.challenge}</h2>
            </div>
            <div className="grid grid-cols-6">
                {urls.map((url, i) => (
                    <img key={i} src={url} alt={team.members[i]} />
                ))}
            </div>
            <h4>Submitted by: <span className="font-semibold">{team.createdBy}</span></h4>
            {team.createdAt && <p className="text-sm font-light">{formatDistanceToNow(new Date(team.createdAt), {addSuffix: true})}</p>}
            {user && user.data.username === team.createdBy ? (
                <span
                    className="material-symbols-outlined bg-gray-200 absolute top-3 right-3 p-2 rounded-2xl cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete
                </span>
                ) : null
            }
        </div>
    )
}

export default TeamCard