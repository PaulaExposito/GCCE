const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Alumno = require('./Alumno');

const Acceso = sequelize.define(
    'Acceso', 
    {
        cod_alu: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Alumno',
                key: 'cod_alu'
            }
        },
        tipo_acceso: {type: DataTypes.STRING, primaryKey: false},
        nota_acceso: {type: DataTypes.FLOAT, primaryKey: false},
        nota_med_bas: {type: DataTypes.INTEGER, primaryKey: false},
        nota_med_esp: {type: DataTypes.INTEGER, primaryKey: false},
        nota_bach: {type: DataTypes.INTEGER, primaryKey: false},

        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        freezeTableName: true
    }
);

module.exports = Acceso;