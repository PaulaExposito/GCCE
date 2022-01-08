const { conexion } = require('../config/database.js');

// Database access methods

async function dropTables(califDTO) {
    let sql = `
        DROP TABLE IF EXISTS Acceso;
        DROP TABLE IF EXISTS Alumno;
        DROP TABLE IF EXISTS Asignatura;
        DROP TABLE IF EXISTS CalifAcademica;
        DROP TABLE IF EXISTS Matricula;
        DROP TABLE IF EXISTS Profesor;
        DROP TABLE IF EXISTS ServiciosExternos;
        DROP TABLE IF EXISTS Titulacion;
    `
    await conexion.query(sql, [califDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of tables deleted: " + result.affectedRows);
    });
}

module.exports = { dropTables };
