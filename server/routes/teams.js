const express = require('express')
const { getAllTeams, getTeam, createTeam, deleteTeam, updateTeam } = require('../controllers/TeamController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/', getAllTeams)

router.get('/:id', getTeam)

router.use(requireAuth)

router.post('/', createTeam)

router.delete('/:id', deleteTeam)

router.patch('/:id', updateTeam)

module.exports = router