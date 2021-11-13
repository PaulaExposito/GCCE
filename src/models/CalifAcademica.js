const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Alumno = require('./Alumno');
const Asignatura = require('./Asignatura');
const Matricula = require('./Matricula');
const Titulacion = require('./Titulo');
const Profesor = require('./Profesor');

const CalifAcademica = (sequelize, Sequelize) => {
    const {INTEGER, STRING, BOOLEAN} = Secuelize;
    const CalifAcademica = sequelize.define('CalifAcademica', {
        cod_matricula: {
            type: INTEGER,
            references: {
                model: Matricula,
                key: 'cod_matricula'
            }
        },        
        cod_titulo: {
            type: INTEGER,
            references: {
                model: Titulacion,
                key: 'cod_titulo'
            }
        },        
        cod_profesor: {
            type: INTEGER,
            references: {
                model: Profesor,
                key: 'cod_profesor'
            }
        },        
        cod_alu: {
            type: INTEGER,
            references: {
                model: Alumno,
                key: 'cod_alu'
            }
        },        
        cod_asig: {
            type: INTEGER,
            references: {
                model: Asignatura,
                key: 'cod_asig'
            }
        },
        convocatoria: {type: NUMBER, primaryKey: false},
        calif_num: {type: NUMBER, primaryKey: false},
        calificacion: {type: STRING, primaryKey: false},
        presentado: {type: BOOLEAN, primaryKey: false}
    });
}

module.exports = CalifAcademica