const NotaEbau = require('../models/NotaEbau')

// Database access methods

async function createNotaEbau(notaebauDTO) {
    console.log(notaebauDTO);
    console.log();
}


// Generate random data
const subjectName = ["Matemáticas", "Física", "Historia", "Latin", "Griego", "Tecnología", "Dibujo Técnico"]


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function generateNotaEbau() {
    createNotaEbau({
        //cod_materia: Number,
        materia: subjectName[Math.floor(Math.random() * subjectName.length)],
        nota: randomIntFromInterval(1,10),
    });
}

module.exports = {
    generateNotaEbau
}