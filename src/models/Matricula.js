const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Alumno = require('./Alumno');

const Matricula = sequelize.define(
    'Matricula', 
    {
        cod_matricula: {type: DataTypes.INTEGER, primaryKey: true},
        cod_alumno: {
            type: DataTypes.INTEGER,
            references: {
                model: Alumno,
                key: 'cod_alu'
            }
        },
        cred_aprobados: {type: DataTypes.INTEGER, primaryKey: false},
        cred_matriculados: {type: DataTypes.INTEGER, primaryKey: false},
        year: {type: DataTypes.STRING, primaryKey: false},
        poat: {type: DataTypes.BOOLEAN, primaryKey: false},
        nuevo_ingreso: {type: DataTypes.BOOLEAN, primaryKey: false},
        coste_credito: {type: DataTypes.INTEGER, primaryKey: false},
        beca: {type: DataTypes.BOOLEAN, primaryKey: false},
        cancela_matricula: {type: DataTypes.BOOLEAN, primaryKey: false},
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        freezeTableName: true
    }
);

module.exports = Matricula;