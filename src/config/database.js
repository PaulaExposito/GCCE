// module.exports = {
//     remoteUrl: "mongodb+srv://admin:admin@cluster0.fmohx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     localUrl: "mongodb://127.0.0.1:27017/gcce"       
// };

const mysql = require('mysql');

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
   'GCCE', // TutorialsPoint
   'root', // root
   'root', 
   {
      dialect: 'mysql',
      host: 'localhost'
   }
);

let conexion = mysql.createConnection({
    host : 'localhost',
    database : 'GCCE',
    user : 'root',
    password : 'root',
    port: 3306,
    insecureAuth : true
});

function connectDatabase() {
    conexion.connect(function(err) {
        if (err) {
            console.error('Error de conexion: ' + err.stack);
            return;
        }
        console.log('Conectado con el identificador ' + conexion.threadId);
    });
}

function disconnectDatabase() {
    conexion.end();
}

module.exports = {
    connectDatabase,
    conexion,
    disconnectDatabase,
    sequelize
}