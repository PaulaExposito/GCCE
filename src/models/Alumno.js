const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Titulacion = require('./Titulacion');

const Alumno = sequelize.define(
    'Alumno', 
    {
        cod_alu: {type: DataTypes.INTEGER, primaryKey: true},
        cod_titulo: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Titulacion',
                key: 'cod_titulo'
            }
        },
        estado: {type: DataTypes.STRING, primaryKey: false},
        nom_alu: {type: DataTypes.STRING, primaryKey: false},
        apellido1: {type: DataTypes.STRING, primaryKey: false},
        apellido2: {type: DataTypes.STRING, primaryKey: false},
        sexo: {type: DataTypes.STRING, primaryKey: false},
        year: {type: DataTypes.STRING, primaryKey: false},
        niv_est_prog1: {type: DataTypes.STRING, primaryKey: false},
        niv_est_prog2: {type: DataTypes.STRING, primaryKey: false},
        niv_renta: {type: DataTypes.STRING, primaryKey: false},
        municipio: {type: DataTypes.STRING, primaryKey: false},
        provincia: {type: DataTypes.STRING, primaryKey: false},
        _zona: {type: DataTypes.STRING, primaryKey: false},
        
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        freezeTableName: true
    }
);

module.exports = Alumno;