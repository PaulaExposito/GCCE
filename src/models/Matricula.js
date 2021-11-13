const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Alumno = require('./Alumno');

const Matricula = (sequelize, Sequelize) => {
    const {INTEGER, STRING, BOOLEAN} = Secuelize;
    const Matricula = sequelize.define('Matricula', {
        cod_matricula: {type: INTEGER, primaryKey: true},
        cod_alumno: {
            type: INTEGER,
            references: {
                model: Alumno,
                key: 'cod_alumno'
            }
        },
        cred_aprobados: {type: INTEGER, primaryKey: false},
        cred_matriculados: {type: INTEGER, primaryKey: false},
        year: {type: STRING, primaryKey: false},
        poat: {type: BOOLEAN, primaryKey: false},
        nuevo_ingreso: {type: BOOLEAN, primaryKey: false},
        coste_credito: {type: INTEGER, primaryKey: false},
        beca: {type: BOOLEAN, primaryKey: false},
        cancela_matricula: {type: BOOLEAN, primaryKey: false}
    });
}

module.exports = Matricula;