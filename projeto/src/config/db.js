const mysql2 = require("mysql2/promise");

// BANCO DE DADOS
const connection = async () => {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const con = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'clinica_medica',
        user: 'root',
        password: '1234',
        multipleStatements:true 
    });

    console.log("O aplicativo foi conectado ao banco de dados corretamente.");
    global.connection = con;
    return con;
}


module.exports = { connection };