const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Alumno = require('./Alumno');

const Acceso = (secuelize, Secuelize) => {
    const {INTEGER, STRING} = Secuelize;
    const Acceso = sequelize.define('Acceso', {
        cod_alu: {
            type: INTEGER,
            references: {
                model: Alumno,
                key: 'cod_alu'
            }
        },
        tipo_acceso: {type: STRING, primaryKey: false},
        nota_acceso: {type: INTEGER, primaryKey: false},
        nota_med_bas: {type: INTEGER, primaryKey: false},
        nota_med_esp: {type: INTEGER, primaryKey: false},
        nota_bach: {type: INTEGER, primaryKey: false}
    });
}

module.exports = Acceso;