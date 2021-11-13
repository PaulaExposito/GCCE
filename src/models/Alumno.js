const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Alumno = (sequelize, Sequelize) => {
    const {INTEGER, STRING} = Secuelize;
    const Alumno =  sequelize.define('Alumno', {
        cod_alu: {type: INTEGER, primaryKey: true},
        cod_titulo: {
            type: INTEGER,
            references: {
                model: Titulacion,
                key: 'cod_titulo'
            }
        },
        estado: {type: STRING, primaryKey: false},
        nom_alu: {type: STRING, primaryKey: false},
        apellido1: {type: STRING, primaryKey: false},
        apellido2: {type: STRING, primaryKey: false},
        sexo: {type: STRING, primaryKey: false},
        year: {type: INTEGER, primaryKey: false},
        niv_est_prog1: {type: STRING, primaryKey: false},
        niv_est_prog2: {type: STRING, primaryKey: false},
        niv_renta: {type: INTEGER, primaryKey: false},
        municipio: {type: STRING, primaryKey: false},
        provincia: {type: STRING, primaryKey: false},

    });
}

module.exports = Alumno;