const Team = require('../models/teamModel')
const mongoose = require('mongoose')

const getAllTeams = async (req, res) => {

    const teams = await Team.find({}).sort({createdAt: -1})
    res.status(200).json(teams)
}

const getTeam = async (req, res) => {
    
    const { id } = req.params
    if(!mongoose.isValidObjectId(id)) {
        return res.status(404).json({error: 'No team with ID'})
    }

    const team = await Team.findById(id)
    if (!team) {
        return res.status(404).json({error: 'No team with ID'})
    }
    res.status(200).json(team)
}

const createTeam = async (req, res) => {
    
    const {game, challenge, members} = req.body

    let emptyFields = []
    if (!game) {
        emptyFields.push('game')
    }
    if (!challenge) {
        emptyFields.push('challenge')
    }
    if (!members) {
        emptyFields.push('members')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    
    try {
        const createdBy = req.user.username
        const team = await Team.create({game, challenge, members, createdBy})
        res.status(200).json(team)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteTeam = async (req, res) => {

    const { id } = req.params
    if(!mongoose.isValidObjectId(id)) {
        return res.status(404).json({error: 'No team with ID'})
    }

    const team = await Team.findOneAndDelete({_id: id})
    if (!team) {
        return res.status(404).json({error: 'No team with ID'})
    }
    res.status(200).json(team)
}

const updateTeam = async  (req, res) => {

    const { id } = req.params
    if(!mongoose.isValidObjectId(id)) {
        return res.status(404).json({error: 'No team with ID'})
    }

    const team = await Team.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!team) {
        return res.status(404).json({error: 'No team with ID'})
    }
    res.status(200).json(team)
}

module.exports = { getAllTeams, getTeam, createTeam, deleteTeam, updateTeam }