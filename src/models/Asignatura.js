const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Titulacion = require('./Titulacion');

const Asignatura = sequelize.define(
    'Asignatura', 
    {
        cod_asig: {type: DataTypes.INTEGER, primaryKey: true},
        cod_titulo: {
            type: DataTypes.INTEGER,
            references: {
                model: Titulacion,
                key: 'cod_titulo'
            }
        },
        profesor: {type: DataTypes.INTEGER, primaryKey: false},
        dificultad: {type: DataTypes.STRING, primaryKey: false},
        cred_asig: {type: DataTypes.INTEGER, primaryKey: false},
        nom_asig: {type: DataTypes.STRING, primaryKey: false},
        curso: {type: DataTypes.INTEGER, primaryKey: false},
        cuatrimestre: {type: DataTypes.INTEGER, primaryKey: false},
        tip_asig: {type: DataTypes.STRING, primaryKey: false},
        especial: {type: DataTypes.BOOLEAN, primaryKey: false},
        
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        freezeTableName: true
    }
);

module.exports = Asignatura;