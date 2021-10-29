const Titulacion = require('../models/Titulacion');

// Database access methods

async function createTitulacion(titulacionDTO) {
    console.log(titulacionDTO);
    console.log();
    // if (titulacionDTO == null)  return;
    // const titulacion = new Titulacion(titulacionDTO);
    // await titulacion.save();
}

async function getAllTitulaciones() {
    const titulacion = await Titulacion.find();
    console.log(titulacion);
}

async function removeAllTitulaciones() {
    await Titulacion.remove({});
}


// Generate random data

const titleTypes = ["grado", "master"];
const studieTypes = ["Ingenieria informatica", "Biologia", "Ingenieria nautica", "Filosofia"];
const ctsNumber = [240, 72, 60];

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateTitulacion() {
    createTitulacion({
        // cod_titul: 0,
        asignaturas: 40,
        num_cursos: 4,
        tip_titul: titleTypes[0],
        tip_estud: studieTypes[Math.floor(Math.random() * studieTypes.length)],
        total_cred: ctsNumber[0],
        p_abandono: randomIntFromInterval(0, 100),
    });
}


module.exports = {
    generateTitulacion
}