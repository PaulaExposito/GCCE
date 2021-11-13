const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Alumno = require('./Alumno');

const ServiciosExternos = (sequelize, Sequelize) => {
    const {INTEGER, STRING, BOOLEAN} = Secuelize;
    const ServiciosExternos = sequelize.define('ServiciosExternos', {
        num_ss: {type: STRING, primaryKey: true},
        cod_alumno: {
            type: INTEGER,
            references: {
                model: Alumno,
                key: 'cod_alumno'
            }
        },
        trabaja: {type: BOOLEAN, primaryKey: false},
        sueldo: {type: INTEGER, primaryKey: false}
    });
}

module.exports = ServiciosExternos;