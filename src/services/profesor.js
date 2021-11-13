// const Profesor = require('../models/Profesor')

// Database access methods

async function createProfesor(matriculaDTO) {
    // console.log(matriculaDTO);
    // console.log();
}


// Generate random data

const names = require('../config/data').names;
const lastnames = require('../config/data').lastnames;
const categories =  require('../config/data').categories;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateProfessor(id) {
    const yearBegin = randomIntFromInterval(2005,2021);
    const yearEnd = yearBegin + 1;
    const professor = {
        cod_prof: id,
        // asign_impartidas: randomIntFromInterval(1, 5),
        asign_impartidas: -1,   // va a petar la bbdd (tipo NUMBER <- tipo INTEGER)
        nom_prof: names[Math.floor(Math.random() * names.length)],
        apellido1: lastnames[Math.floor(Math.random() * lastnames.length)] ,
        apellido2: lastnames[Math.floor(Math.random() * lastnames.length)],
        catego: categories[Math.floor(Math.random() * categories.length)],
        year: yearBegin + "/" + yearEnd,
        tiempo_ull: randomIntFromInterval(1, 10),
    }

    createProfesor(professor);
    return professor;
}

module.exports = {
    generateProfessor
}