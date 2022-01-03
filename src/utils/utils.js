const { FIRST_YEAR_DATA } = require('../config/config');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getInitYear(id) {
    return `${FIRST_YEAR_DATA + id}/${FIRST_YEAR_DATA + id + 1}`; 
}


/// Esta funcion devuelve el numero de matriculas que ha hecho un alumno de forma inteligente
function getNumberOfMatriculas(alumno, titulacion) {
    const estado = alumno[2]; 
    const initYear = parseInt(alumno[7].split("/")[0]);
    const currentYear = new Date().getFullYear();
    const pctAbandonoTitulacion = titulacion[6];
    const duracion = titulacion[2];

    
    // TODO: borrar, solo para pruebas
    // return 4;
    
    switch(estado) {
        case "activo": {
            return currentYear - initYear;
        }
        case "pausado": {
            // Lleva 1 o 2 años sin hacer matricula pero no esta graduado desde la actualidad
            const random = parseInt(Math.random() * 10);
            return currentYear - initYear - (random % 2 + 1);
        }
        case "graduado": {
            if (initYear + duracion < currentYear) {
                const randomNumber = Math.random();
                const timeBetweenTeoricalFinishAndNow = currentYear - initYear + duracion;
                
                // Menor numero posible: Acabo en tiempo --> initYear + duracion
                if(randomNumber < 0.3) {
                    return initYear + duracion
                }
                // Mayor numero posible: Acabo el año pasado --> currentYear - initYear - 1
                else if(randomNumber >= 0.3 && randomNumber < 0.8) {
                    return currentYear - initYear - 1
                }
                // Resto: en medio de los otros dos valores
                else {
                    return randomIntFromInterval(initYear + duracion, currentYear - initYear - 1);
                }

                // TODO: decidir con que probabilidad se coge cada uno
            }
            else {  // Nunca deberia entrar aqui
                new Error();
            }
        }
        case "abandono": {
            // Lleva mas de dos años sin matricularse
            // Menor numero posible: 1 matricula en initYear
            // Mayor numero posible: currentYear - initYear - 3
            // Resto: en medio de los otros dos valores
        }
        default: new Error();
    } 
}

module.exports = {
    randomIntFromInterval,
    getInitYear,
    getNumberOfMatriculas,
}