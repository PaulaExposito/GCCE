const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
S
const Titulacion = require('./Titulacion');

const Asignatura = (sequelize, Sequelize) => {
    const {INTEGER, STRING, ARRAY, BOOLEAN} = Secuelize;
    const Asignatura = sequelize.define('Asignatura', {
        cod_asig: {type: INTEGER, primaryKey: true},
        cod_titulo: {
            type: INTEGER,
            references: {
                model: Titulacion,
                key: 'cod_titulo'
            }
        },
        profesor: {type: INTERGER, primaryKey: false},
        dificultad: {type: STRING, primaryKey: false},
        cred_asig: {type: NUMBER, primaryKey: false},
        nom_asig: {type: STRING, primaryKey: false},
        curso: {type: NUMBER, primaryKey: false},
        cuatrimestre: {type: NUMBER, primaryKey: false},
        tip_asig: {type: STRING, primaryKey: false},
        especial: {type: BOOLEAN, primaryKey: false},
    });
}

module.exports = Asignatura;