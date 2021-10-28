// const express = require('express');
const mongoose = require('mongoose');
const database = require('./config/database');
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



const alumno = require('./services/alumno');

for (let i = 0; i < 5; ++i) {
    console.log(i)
    alumno.generateAlumno();
}

