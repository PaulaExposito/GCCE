const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Profesor = sequelize.define(
    'Profesor', 
    {
        cod_profesor: {type: DataTypes.INTEGER, primaryKey: true},
        asign_impartidas: {type: DataTypes.INTEGER, primaryKey: false},
        nom_prof: {type: DataTypes.STRING, primaryKey: false},
        apellido1: {type: DataTypes.STRING, primaryKey: false},
        apellido2: {type: DataTypes.STRING, primaryKey: false},
        catego: {type: DataTypes.STRING, primaryKey: false},
        year: {type: DataTypes.STRING, primaryKey: false},
        tiempo_ull: {type: DataTypes.INTEGER, primaryKey: false},
        
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        freezeTableName: true
    }
);

module.exports = Profesor;