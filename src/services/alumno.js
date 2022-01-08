const { conexion } = require('../config/database.js');
const { randomIntFromInterval, getInitYear } = require('../utils/utils.js');

// Database access methods

async function createAlumno(alumnoDTO) {
    let sql = `INSERT INTO Alumno (cod_alu, cod_titulo, estado, nom_alu, apellido1, apellido2, sexo, year, niv_est_prog1, niv_est_prog2, niv_renta, municipio, provincia, _zona) VALUES ?`
    await conexion.query(sql, [alumnoDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}


// Generate random data

const titleStatus = require('../config/data').titleStatus;
const names = require('../config/data').names;
const lastnames = require('../config/data').lastnames;
const gender = require('../config/data').gender;
const educationalLevel = require('../config/data').educationalLevel;
const rentLevel = require('../config/data').rentLevel;
const townships = require('../config/data').townships;

function abandonRandomState(abandonProb, notaAcceso, posibilities, years) {
    const randomNumber = randomIntFromInterval(1, 10);
    if( (abandonProb < 30 || notaAcceso > 9) || years >= 3 ) {
        return randomNumber < 3 ? posibilities[1] : titleStatus[Math.floor(Math.random() * titleStatus.length)];
    }
    else if ( (abandonProb >= 30 && abandonProb < 50) || (notaAcceso > 6 && years < 2)) {
        return randomNumber < 4 ? posibilities[0] : titleStatus[Math.floor(Math.random() * titleStatus.length)];
    }
    else {
        return randomNumber < 6 ? posibilities[1] : titleStatus[Math.floor(Math.random() * titleStatus.length)];
    }
}


function getState(titulProbAbandono, titulDuracion, notaAcceso, initCourse) {
    const initYear = parseInt(initCourse.split("/")[0]);
    const currentYear = new Date().getFullYear();
    const yearsBetweenInitAndNow = currentYear - initYear;

    if (yearsBetweenInitAndNow <= titulDuracion) {
        return abandonRandomState(titulProbAbandono, notaAcceso, ["activo", "abandono", "pausado"], yearsBetweenInitAndNow);
    }
    else {
        // Puede ser todo
        const random = Math.random() * 100;
        // Graduado 60% Pausado 20% Activo 20%
        if (titulProbAbandono < random) {
            const randNumber = randomIntFromInterval(1,10)
            if (randNumber > 8 && titulDuracion + 2 <= yearsBetweenInitAndNow) {                
                return "activo"
            }
            else if(randNumber > 6 && randNumber <= 8) {
                if (titulDuracion + 4 <= yearsBetweenInitAndNow)                
                    return "pausado"
                else 
                    return "abandono"
            }
            else {
                return "graduado"
            }
        }
        else {
            return "abandono"
        }
    }
}

function randomTownship() {
    const randtownships = townships[Math.floor(Math.random() * townships.length)];
    const randomLevel = Math.floor(Math.random() * educationalLevel.length);
    const randomNumber = randomIntFromInterval(1, 5) % 5;

    switch (randtownships.zone) {
        case "Pueblo":
            if (randomNumber >= 0 && randomNumber < 3) {
                randtownships.level = educationalLevel[(randomLevel + 4) % educationalLevel.length];
            }
            else {
                randtownships.level = educationalLevel[randomLevel];
            }
        break;
        case "Ciudad":
            if (randomNumber >= 0 && randomNumber < 4) {
                randtownships.level = educationalLevel[randomLevel];
            }
            else {
                randtownships.level = educationalLevel[(randomLevel + 4) % educationalLevel.length];
            }

        break;
        default: throw Error();
    }
    return randtownships;
}

function getRentLevel(townshipProg1, townshipProg2) {
    const randomNumber = Math.floor(Math.random() * rentLevel.length) % 6;
    if (townshipProg1.zone == townshipProg2.zone == "Pueblo") {
        return (randomNumber < 2) ? rentLevel[0] :
                    (randomNumber < 6) ? rentLevel[1] :
                        rentLevel[2];
    }
    else if (townshipProg1.zone == townshipProg2.zone == "Ciudad") {
        return (randomNumber < 2) ? [0] : 
                    (randomNumber < 5) ? rentLevel[2] :
                        rentLevel[1]   
    }
    else {
        return (randomNumber < 3) ? rentLevel[1] : rentLevel[2];
    }
}

function randomGender() {
    const randomNumber = randomIntFromInterval(1, 10) % 3;
    if (randomNumber == 0)
        return "masculino";
    else if (randomNumber == 1)
        return "femenino";
    else {
        return gender[Math.floor(Math.random() * gender.length)];
    }
}

function generateAlumno(id, titulacion, cohorte, acceso) {
    const gender = randomGender();
    const townshipProg1 = randomTownship();
    const townshipProg2 = randomTownship();
    const initYear = getInitYear(cohorte);
    const state = getState(titulacion[6], titulacion[2], acceso[2], initYear);

    const student = [
        id,
        titulacion[0],
        state,
        names[Math.floor(Math.random() * names.length)],
        lastnames[Math.floor(Math.random() * lastnames.length)],
        lastnames[Math.floor(Math.random() * lastnames.length)],
        gender,
        initYear,
        townshipProg1.level,
        townshipProg2.level,
        getRentLevel(townshipProg1, townshipProg2),
        townshipProg1.town,
        townshipProg1.provinces,
        townshipProg1.zone
    ];

    createAlumno(student);
    return student;
}


module.exports = {
    generateAlumno
}
