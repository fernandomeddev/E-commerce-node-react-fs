const db = require('../models')
const bcrypt = require('bcrypt-nodejs')

const { existsOrError, notExistsOrError, equalsOrError } = require('./validation')

const encryptPassword = user_password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(user_password, salt)
}


// create main Model
const User = db.users
//const Product = db.products

// main work

// 1. create user

const addUser = async (req, res) => {

    let info = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        confirmPassword: req.body.confirmPassword
    }
    if(req.params.id) info.user_id = req.params.id

    try{
        existsOrError(info.user_name, 'Nome não informado')
        existsOrError(info.user_email, 'Email não informado')
        existsOrError(info.user_password, 'Senha não informada')
        existsOrError(info.confirmPassword, 'confirmação de senha inválida')
        equalsOrError(info.user_password, info.confirmPassword, 'senhas não conferem')
        
        const userFromDB = await User
            .findOne({where : {user_email : info.user_email }})
        if(!info.user_id){
            notExistsOrError(userFromDB, 'Usuário já cadastrado')
        }
        
    }catch(msg){
        if(!msg){
            msg = "Custom Error"
            return res.status(400).send(msg)
        }
        return res.status(400).send(msg)
    }

    info.user_password = encryptPassword(info.user_password)
    delete info.confirmPassword

    const user = await User.create(info)
    res.status(200).send(user)
    console.log(user)

}



// 2. get all users

const getAllUsers = async (req, res) => {

    let users = await User.findAll({})
    res.status(200).send(users)

}

// 3. get single product

const getOneUser = async (req, res) => {

    let user_id = req.params.id
    let user = await User.findOne({ where: { user_id: user_id }})
    res.status(200).send(user)

}

// 4. update User

const updateUser = async (req, res) => {

    let user_id = req.params.id

    const user = await User.update(req.body, { where: { user_id: user_id }})

    res.status(200).send(user)
   

}

// 5. delete User by id

const deleteUser = async (req, res) => {

    let user_id = req.params.id
    
    await User.destroy({ where: { user_id: user_id }} )

    res.status(200).send('User is deleted !')

}


module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}