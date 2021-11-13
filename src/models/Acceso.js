//const mongoose = require('mongoose');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Acceso = (secuelize, Secuelize) => {
    const {INTEGER, STRING} = Secuelize;
    const Acceso = sequelize.define('Acceso', {
        cod_alu: {type: INTEGER, primaryKey: true},
        tipo_acceso: {type: STRING, primaryKey: false},
        nota_acceso: {type: INTEGER, primaryKey: false},
        nota_med_bas: {type: INTEGER, primaryKey: false},
        nota_med_esp: {type: INTEGER, primaryKey: false},
        nota_bach: {type: INTEGER, primaryKey: false}
    });
}

module.exports = Acceso;