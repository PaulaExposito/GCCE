const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Alumno = require('./Alumno');

const ServiciosExternos = sequelize.define(
    'ServiciosExternos', 
    {
        num_ss: {type: DataTypes.INTEGER, primaryKey: true},
        cod_alu: {
            type: DataTypes.INTEGER,
            references: {
                model: Alumno,
                key: 'cod_alu'
            }
        },
        trabaja: {type: DataTypes.BOOLEAN, primaryKey: false},
        sueldo: {type: DataTypes.INTEGER, primaryKey: false},
        
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        freezeTableName: true
    }
);

module.exports = ServiciosExternos;