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

const masterCred = [60,72,180];
const studieTypes = ["Ingenieria informatica", "Biologia", "Ingenieria nautica", "Filosofia"]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateTitulacion(gradeType, credits) {
    createTitulacion({
        // cod_titul: 0,
        asignaturas: 40,
        num_cursos: 4,
        tip_titul: gradeType,
        tip_estud: studieTypes[Math.floor(Math.random() * studieTypes.length)],
        total_cred: credits,
        p_abandono: randomIntFromInterval(0, 100),
    });
}



function generateTitle() {
    const type = randomIntFromInterval(1,2);
    if(type === 1) {
        generateTitulacion("grado", 240)
    }
    else {
        const masterType = randomIntFromInterval(0,2);
        generateTitulacion("master", masterCred[masterType])
    }
}

module.exports = {
    generateTitle
}