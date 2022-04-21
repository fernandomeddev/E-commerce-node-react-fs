const app = require('express')();
const consign = require('consign');
const connection = require('./config/db');
const userModel = require('./model/User');

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!")
    })
    .catch((msgError) => {
        console.log(msgError);
    })
//app.connection = connection;

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend Executando...')
});