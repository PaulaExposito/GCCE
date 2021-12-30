const { Sequelize, Model, DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Titulacion = sequelize.define('Titulacion', {
    cod_titulo: {type: DataTypes.INTEGER, primaryKey: true},
    asignaturas: {type: DataTypes.INTEGER, primaryKey: false},
    num_cursos: {type: DataTypes.INTEGER, primaryKey: false},
    tip_titul: {type: DataTypes.STRING, primaryKey: false},
    tip_estud: {type: DataTypes.STRING, primaryKey: false},
    total_cred: {type: DataTypes.INTEGER, primaryKey: false},
    p_abandono: {type:DataTypes.INTEGER, primaryKey: false},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = {
    Titulacion,
    sequelize
};