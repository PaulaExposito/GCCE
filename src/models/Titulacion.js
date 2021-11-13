const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Titulacion = (sequelize, Sequelize) => {
    const {INTEGER, STRING, ARRAY} = Secuelize;
    const Titulacion = sequelize.define('Titulacion', {
        cod_titul: {type: INTEGER, primaryKey: true},
        asignaturas: {type: ARRAY, primaryKey: false},
        num_cursos: {type: NUMBER, primaryKey: false},
        tip_titul: {type: STRING, primaryKey: false},
        tip_estud: {type: STRING, primaryKey: false},
        total_cred: {type: NUMBER, primaryKey: false},
        p_abandono: {type: NUMBER, primaryKey: false}
    });
}

module.exports = Titulacion;