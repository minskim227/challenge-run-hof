const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(username, password) {

    if (!username || !password) {
        throw Error('Please fill in all the fields')
    }

    if (!validator.isAlphanumeric(username)) {
        throw Error('Username must only contain letters and numbers')
    }
    if (username.length < 4 || username.length > 16) {
        throw Error('Username must be between 4 and 16 characters')
    }
    if (password.length < 8 || password.length > 20) {
        throw Error('Password must be between 8 and 20 characters')
    }
    if (!validator.isStrongPassword(password, {minSymbols: 0})) {
        throw Error('Password must contain an uppercase and lowercase letter and a number')
    }

    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        throw Error('Username already exists')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash })
    return user
}

userSchema.statics.login = async function(username, password) {

    if (!username || !password) {
        throw Error('Please fill in all the fields')
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error('Username does not exist')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
    
    return user
}

module.exports = mongoose.model('User', userSchema)