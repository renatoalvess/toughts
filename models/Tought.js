const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = require("./User")

// user
const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allownull: false,
        require: true,
    },
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought