// const Titulacion = require('../models/Titulacion');

// Database access methods

async function createTitulacion(titulacionDTO) {
    // console.log(titulacionDTO);
    // console.log();
    // if (titulacionDTO == null)  return;
    // const titulacion = new Titulacion(titulacionDTO);
    // await titulacion.save();
}

// async function getAllTitulaciones() {
//     const titulacion = await Titulacion.find();
//     console.log(titulacion);
// }

// async function removeAllTitulaciones() {
//     await Titulacion.remove({});
// }


// Generate random data

const masterCred = [ 60, 72, 180 ];
const studieTypes = require('../config/data').titles;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateTitulacion(id, gradeType, credits) {
    const title = {
        cod_titul: id,
        asignaturas: numberOfSubjects(gradeType),
        num_cursos: numberOfYears(gradeType),
        tip_titul: gradeType,
        tip_estud: studieTypes[id],
        total_cred: credits,
        p_abandono: getTitleAbandon(id),
    }

    createTitulacion(title)
    return title;
}

function generateTitle(id) {
    const type = randomIntFromInterval(1,2);
    if(type === 1) {
        return generateTitulacion(id, "grado", 240)
    }
    else {
        const masterType = randomIntFromInterval(0,2);
        return generateTitulacion(id, "master", masterCred[masterType])
    }
}

function getTitleAbandon(id) {
    if (id < studieTypes.length / 2)
        return randomIntFromInterval(30, 80);
    else 
        return randomIntFromInterval(0, 50);
}

function numberOfSubjects(type) {
    if (type == "grado")
        return 40;
    else 
        return randomIntFromInterval(0, 1) == 0 ? 10 : 20;
}

function numberOfYears(type) {
    if (type == "grado") return 4;
    else return randomIntFromInterval(0, 1);
}


module.exports = {
    generateTitle
}