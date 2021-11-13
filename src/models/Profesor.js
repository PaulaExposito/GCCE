const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Profesor = (sequelize, Sequelize) => {
    const {INTEGER, STRING} = Secuelize;
    const Profesor = sequelize.define('Profesor', {
        cod_prof: {type: INTEGER, primaryKey: true},
        asign_impartidas: {type: INTEGER, primaryKey: false},
        nom_prof: {type: STRING, primaryKey: false},
        apellido1: {type: STRING, primaryKey: false},
        apellido2: {type: STRING, primaryKey: false},
        catego: {type: STRING, primaryKey: false},
        year: {type: INTEGER, primaryKey: false},
        tiempo_ull: {type: INTEGER, primaryKey: false},
        num_sexe: {type: INTEGER, primaryKey: false},
        sexe_act: {type: INTEGER, primaryKey: false}
    });
}

module.exports = Profesor;