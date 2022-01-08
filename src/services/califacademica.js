const { conexion } = require('../config/database.js');
const { CalifAcademica } = require('../models/CalifAcademica');
const { randomIntFromInterval } = require('../utils/utils.js');

// Database access methods

async function createCalifAcademica(califDTO) {
    let sql = `INSERT INTO CalifAcademica (cod_academica, cod_matricula, cod_titulo, cod_profesor, cod_alu, cod_asig, convocatoria, calif_num, calificacion, presentado) VALUES (?)`
    await conexion.query(sql, [califDTO], function (err, result) {
        if (err) throw err;
        console.log("(Calif Academica): Number of records inserted: " + result.affectedRows);
    });
}


// Generate random data

const asigMark = require('../config/data').asigMark;
const asigDifficulty = require('../config/data').asigDifficulty;

function getCalif(vaaaprobar, dificulty, alumno) {
    const zonaAlumno = alumno[13];
    if (vaaaprobar) {
        const randomNumber = Math.random();
        switch(dificulty) {
            case asigDifficulty[0]:
                if (randomNumber < 0.4) {
                    return randomIntFromInterval(9, 10)                    
                }
                else if(randomNumber >= 0.4 && randomNumber < 0.7 && zonaAlumno == "Pueblo"){
                    return randomIntFromInterval(8, 9) 
                }
                else {
                    return randomIntFromInterval(5, 9) 
                }

            case asigDifficulty[1]:
                if(randomNumber < 0.4) {
                    return randomIntFromInterval(8, 9)                    
                }
                else if(randomNumber >= 0.4 && randomNumber < 0.7 && zonaAlumno == "Pueblo"){
                    return randomIntFromInterval(7, 8) 
                }
                else {
                    return randomIntFromInterval(5, 8) 
                }

            case asigDifficulty[2]:
                if(randomNumber < 0.4) {
                    return randomIntFromInterval(7, 8)                    
                }
                else if(randomNumber >= 0.4 && randomNumber < 0.7 && zonaAlumno == "Pueblo"){
                    return randomIntFromInterval(6, 7) 
                }
                else {
                    return randomIntFromInterval(5, 7) 
                }
                
            case asigDifficulty[3]:
                if(randomNumber < 0.4) {
                    return randomIntFromInterval(6, 7)                    
                }
                else if(randomNumber >= 0.4 && randomNumber < 0.7 && zonaAlumno == "Pueblo"){
                    return randomIntFromInterval(5, 7) 
                }
                else {
                    return randomIntFromInterval(5, 6) 
                }
        }
    }
    else {
        if (Math.random() >= 0.8) {
            return randomIntFromInterval(1, 4);
        }
        else
            return 0;    
    }
}

function getCalifString(calif) {
    if (calif == 10) {
        return asigMark[5];
    }      
    else if (calif >= 9 && calif < 10) {
        return asigMark[4];
    }
    else if (calif >= 7 && calif < 9) {
        return asigMark[3];
    }
    else if (calif >= 5 && calif < 7) {
        return asigMark[2];
    }
    else if (calif >= 1 && calif < 5) {
        return asigMark[1];
    }
    else {
        return asigMark[0];
    }
}

function generateCalifAcademica(id, matricula, titulacion, estudiante, asignaturas, asignaturasAprobadas, vaaaprobar, asigEspeciales) {
    
    let presentado = true;
    
    const calif = getCalif(vaaaprobar, asignaturas[3], estudiante);
    let califString = getCalifString(calif);

    if (califString == "No presentado")
        presentado = false;
    
    const califAcad = [
        id,
        /*cod_matricula:*/ matricula[0],
        /*cod_titulo:*/ titulacion[0],
        /*cod_prof:*/ asignaturas[2],
        /*cod_alu:*/ estudiante[0],
        /*cod_asig:*/ asignaturas[0],
        /*convocatoria:*/ -1,
        /*calif_num:*/ calif,
        /*calificacion:*/ califString,
        /*presentado:*/ presentado
    ]

    if (califString != "No presentado" && califString != "Insuficiente") {
        if (asigEspeciales[0] == 1)
            asigEspeciales[0] = 2;
        else if (asigEspeciales[1] == 1)
            asigEspeciales[1] = 2;
    }

    createCalifAcademica(califAcad);
    return califAcad;
}

module.exports = {
    generateCalifAcademica
}
