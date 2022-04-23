const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const db = require("../models")

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.user_email || !req.body.user_password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await db.users.findOne({where:{user_email : req.body.user_email}})
            
        if (!user) return res.status(400).send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.user_password, user.user_password)
        if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            user_id: user.user_id,
            user_name: user.user_name,
            user_email: user.user_email,
            user_password: user.user_password,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}