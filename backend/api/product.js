const db = require('../models')


module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const product = { ...req.body }
        if(req.params.id) product.products_id = req.params.id

        try{
            existsOrError(product.product_name, 'Nome não informado')
            existsOrError(product.product_description, 'descrição não informada')
            existsOrError(product.product_price, 'preço não informado')

            const productFromDB = await db.products.findOne({where:{product_name: product.product_name}})
            
            if(!product.product_id){
                notExistsOrError(productFromDB, 'Produto já cadastrado ')
            }
            console.log(productFromDB)
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(product.product_id){
            db.products.update(req.body, {where: {products_id : req.params.id}})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            db.products.create(product)
        .then(_ => res.status(200).send(), console.log(product))
        .catch(err => res.status(500).send(err))
        }
        
        /*
        db.users.create(user)
        .then(_ => res.status(200).send(), console.log(user))
        .catch(err => res.status(500).send(err))
        */
    }

    const get = (req, res) => {
        db.products
            .findAll({})
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        db.products.findOne({where: {products_id : req.params.id}})
            .then(product => res.json(product))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await db.products.destroy({where: {products_id : req.params.id}})
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save , get, getById, remove }
}