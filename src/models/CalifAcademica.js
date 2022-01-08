const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Alumno = require('./Alumno');
const Asignatura = require('./Asignatura');
const Matricula = require('./Matricula');
const Titulacion = require('./Titulacion');
const Profesor = require('./Profesor');

const CalifAcademica = sequelize.define('CalifAcademica', {
        cod_academica: {type: DataTypes.INTEGER, primaryKey: true},
        cod_matricula: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Matricula',
                key: 'cod_matricula'
            }
        },        
        cod_titulo: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Titulacion',
                key: 'cod_titulo'
            }
        },        
        cod_profesor: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Profesor',
                key: 'cod_profesor'
            }
        },        
        cod_alu: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Alumno',
                key: 'cod_alu'
            }
        },        
        cod_asig: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Asignatura',
                key: 'cod_asig'
            }
        },
        convocatoria: {type: DataTypes.INTEGER, primaryKey: false},
        calif_num: {type: DataTypes.INTEGER, primaryKey: false},
        calificacion: {type: DataTypes.STRING, primaryKey: false},
        presentado: {type: DataTypes.BOOLEAN, primaryKey: false},
        
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        freezeTableName: true
    }
);

module.exports = CalifAcademica