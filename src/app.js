// const express = require('express');
const mysql = require('mysql');
// const database = require('./config/database');
// const app = express();


// mongoose.connect(database.localUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(db => console.log('Conectado a mongodb'))
//     .catch(err => console.log(`Error con mongo: ${err}`));


// app.get('/', function (req, res) {
//     res.send('Hello World!');
// })

// const server = app.listen(8080, () => {
//     console.log('Example app listening');
// });

let conexion= mysql.createConnection({
    host : 'localhost',
    database : 'GCCE',
    user : 'root',
    password : 'root',
    port: 3306,
    insecureAuth : true
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

conexion.end();

/*const alumno = require('./services/alumno');
const titulacion = require('./services/titulacion');
const acceso = require('./services/acceso');
const asignatura = require('./services/asignatura');
const matricula = require('./services/matricula');
const profesor = require('./services/profesor');
const notaebau = require('./services/notaebau');
const califacademica = require('./services/califacademica');
const serviciosexternos = require('./services/serviciosexternos');

for (let i = 0; i < 5; ++i) {
    console.log(i)
    alumno.generateAlumno();
}

for (let i = 0; i < 2; ++i) {
    titulacion.generateTitle();
}

for (let i = 0; i < 4; ++i) {
    acceso.generateAcceso();
}

for (let i = 0; i < 4; ++i) {
    asignatura.generateAsignatura();
}

for (let i = 0; i < 4; ++i) {
    matricula.generateMatricula();
}

for (let i = 0; i < 4; ++i) {
    profesor.generateProfesor();
}

for (let i = 0; i < 4; ++i) {
    notaebau.generateNotaEbau();
}

for (let i = 0; i < 4; ++i) {
    califacademica.generateCalifAcademica();
}

for (let i = 0; i < 4; ++i) {
    serviciosexternos.generateServiciosExternos();
}*/
