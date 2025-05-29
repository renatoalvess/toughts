require('dotenv').config();
const { Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughts2', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Concetamos com sucesso!')
} catch (err) {
    console.log('Não foi possível conectar!')
}

module.exports = sequelize