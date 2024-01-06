import { useEffect, useState } from "react"
import { useTeamContext } from "../hooks/useTeamContext"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from "axios"

function NewTeamForm() {

    const [gen, setGen] = useState(0)
    const [gamesList, setGamesList] = useState([])
    const [game, setGame] = useState('')
    const [challenge, setChallenge] = useState('')
    const [members, setMembers] = useState([])
    const [urls, setUrls] = useState([])
    const [currentMember, setCurrentMember] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const { dispatch } = useTeamContext()
    const { user } = useAuthContext()

    useEffect(() => {
        
        const handleGames = () => {

            switch (gen) {
                case 1:
                    setGamesList(['Red', 'Blue', 'Yellow'])
                    break
                case 2:
                    setGamesList(['Gold', 'Silver', 'Crystal'])
                    break
                case 3:
                    setGamesList(['Ruby', 'Sapphire', 'Emerald', 'Fire Red', 'Leaf Green'])
                    break
                case 4:
                    setGamesList(['Diamond', 'Pearl', 'Platinum', 'Heart Gold', 'Soul Silver'])
                    break
                case 5:
                    setGamesList(['Black', 'White', 'Black 2', 'White 2'])
                    break
                case 6:
                    setGamesList(['X', 'Y', 'Omega Ruby', 'Alpha Sapphire'])
                    break
                case 7:
                    setGamesList(['Sun', 'Moon', 'Ultra Sun', 'Ultra Moon'])
                    break
                case 8:
                    setGamesList(['Sword', 'Shield', 'Brilliant Diamond', 'Shining Pearl'])
                    break
                case 9:
                    setGamesList(['Scarlet', 'Violet'])
                    break
                default:
                    if (gen < 1) {
                        setGen(1)
                    }
                    if (gen > 9) {
                        setGen(9)
                    }
                    break
            }
        }
        handleGames()
    }, [gen])

    const resetState = () => {
        setGen(0)
        setGamesList([])
        setGame('')
        setChallenge('')
        setMembers([])
        setUrls([])
        setError('')
        setEmptyFields([])
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!user) {
            setError('Log in to submit a team')
            return
        }

        const team = {game, challenge, members}

        if (members.length === 0) {
            setError('Must have at least one team member')
            setEmptyFields('members')
            return
        }

        try {
            const response = await axios.post('https://challenge-run-hof.onrender.com/api/teams', team, {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })
            dispatch({type: 'CREATE_TEAM', payload: team })
            resetState()
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                setError(error.response.data.error)
                setEmptyFields(error.response.data.emptyFields)
            } else {
                console.log(`Error: ${error.message}`)
                setError(error.message)
                setEmptyFields(error.message.emptyFields)
            }
        }
    }

    const addMember = async () => {

        const lowered = currentMember.toLowerCase()
        
        try {
            const imgurl = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowered}`)).data.sprites.front_default
            setMembers([...members, lowered])
            setUrls([...urls, imgurl])
            setCurrentMember('')
            setError('')
            setEmptyFields([])
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                setError('No such Pokemon')
                setEmptyFields('members')
            } else {
                console.log(`Error: ${error.message}`)
                setError('Enter a Pokemon')
                setEmptyFields('members')
            }
        }
    }

    const RemoveMember = (i) => {
        
        setMembers(members.filter((member, index) => index !== i))
        setUrls(urls.filter((url, index) => index !== i))
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter' && members.length < 6) {
            e.preventDefault()
            addMember()
        }
    }
    
    return (
        <form className="px-5 m-2" onSubmit={handleSubmit}>

            <h1 className="font-bold text-xl p-2 text-center">Add a New Team</h1>

            <div className="grid grid-cols-2">
                <div>
                    <label>Gen:</label>
                    <input className="[&::-webkit-inner-spin-button]:appearance-none w-2/3"
                        type="number"
                        min={1}
                        max={9}
                        onChange={(e) => setGen(parseInt(e.target.value))}
                        value={gen}
                    />
                </div>

                <div>
                    <label>Game:</label>
                        <select
                            className={emptyFields.includes('game') ? 'w-2/3 empty-field' : 'w-2/3'}
                            onChange={(e) => setGame(e.target.value)}
                            value={game}
                            disabled={!gen}
                        >
                            <option key={0} value={0}>Select</option>
                            {gamesList.map((game, i) => {
                                return (
                                    <option key={i + 1} value={game}>{game}</option>
                                )
                            })}
                        </select>
                </div>
            </div>

            <label>Challenge Type:</label>
            <input
                className={emptyFields.includes('challenge') ? 'empty-field' : ''}
                type="text"
                onChange={(e) => setChallenge(e.target.value)}
                value={challenge}
            />

            <div>
                <label>Team Members:</label>
                <div className="grid grid-cols-3">
                    {members && members.map((member, i) => {
                        return (
                            <div className="relative" key={i}>
                                <img className="" src={urls[i]} alt={member} />
                                <span
                                    className="material-symbols-outlined text-red-500 absolute top-[5%] right-[10%] p-2 rounded-full cursor-pointer"
                                    onClick={() => RemoveMember(i)}
                                >
                                    Close
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className="flex">
                    <input
                        className={`w-2/3 ${emptyFields.includes('members') ? 'empty-field' : ''}`}
                        type="text"
                        onChange={(e) => setCurrentMember(e.target.value)}
                        value={currentMember}
                        onKeyDown={handleEnter}
                        disabled={members.length >= 6}
                        />
                    <div className="flex align-middle justify-center w-1/3">
                        <button
                            className="material-symbols-outlined w-1/2 border border-gray-400 rounded-lg"
                            type="button"
                            onClick={addMember}
                            hidden={members.length >= 6}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    className="submit-button"
                    type="submit"
                    >
                        Add New Team
                    </button>
            </div>
            {error &&
                <div className="error">
                    {error}
                </div>
            }
        </form>
    )
}

export default NewTeamForm