const clienteRoute = require('../aula3/src/routes/clienteRoute');
const express = require('express');

const app = express();

app.use(express.json())
app.use('/', clienteRoute);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});






