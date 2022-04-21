const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const user = require('./model/user')

app.user = user
app.db = db


consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend Executando...')
});