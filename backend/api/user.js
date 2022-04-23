const bcrypt = require('bcrypt-nodejs')
const db = require('../models')


module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.user_id = req.params.id

        try{
            existsOrError(user.user_name, 'Nome não informado')
            existsOrError(user.user_email, 'Email não informado')
            existsOrError(user.user_password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'confirmação de senha inválida')
            equalsOrError(user.user_password, user.confirmPassword, 'senhas não conferem')

            const userFromDB = await db.users.findOne({where:{user_email: user.user_email}})
            
            if(!user.id){
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
            console.log(userFromDB)
        }catch(msg){
            return res.status(400).send(msg)
        }

        user.user_password = encryptPassword(user.user_password)
        delete user.confirmPassword

        
        if(user.id){
            db.users.update(req.body, {where: {user_id : req.params.id}})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            db.users.create(user)
        .then(_ => res.status(200).send(), console.log(user))
        .catch(err => res.status(500).send(err))
        }
        
        /*
        db.users.create(user)
        .then(_ => res.status(200).send(), console.log(user))
        .catch(err => res.status(500).send(err))
        */
    }

    const get = (req, res) => {
        db.users
            .findAll({})
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        db.users.findOne({where: {user_id : req.params.id}})
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await db.users.destroy({where: {user_id : req.params.id}})
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save , get, getById, remove }
}