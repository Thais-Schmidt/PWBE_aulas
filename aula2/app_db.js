// Import do framework express

const express = require("express");

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

//Banco de dados
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const mysql2 = require("mysql2/promise");
    const conn = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'db_clientes',
        user: 'root',
        password: '1234'
    });
    console.log("Conectou no MySQL");
    global.connection = conn;
    return conn;
};

//Retorna todos os clientes existentes na tabela clientes
app.get("/clientes", async (req, res) => {
    const clientes = await selectCliente();
    return res.json(clientes);
});

//seleciona todos os registros da tabela clientes
async function selectCliente() {
    const conn = await connect();
    const [rows] = await conn.query('select * from clientes;');
    return rows;
};

//

//rota para retornar um cliente pelo ID
app.get("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const cliente = await selectOneCliente(id);
    return res.json(cliente)
});

//seleciona o registro desejado na tabela de clientes 
async function selectOneCliente(id) {
    const conn = await connect();
    const sql = 'SELECT * FROM clientes WHERE id=?;';
    const values = id;
    const [rows] = await conn.query(sql, values);
    return rows;
};

//

//create - cria um novo cliente
app.post('/clientes', async(req,res) => {
    const { nome, idade } = req.body;
    const result = await insertCliente({nome:nome, idade:idade});
    console.log(result);
    const cliente = await selectCliente();
    return res.json(cliente);
});

//insere um novo registro na tabela clientes
async function insertCliente(cliente){
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome,idade) VALUES (?,?);'; //onde tem interrogação a biblioteca reconhece que ali vamos colocar algo
    const values  = [cliente.nome, cliente.idade];
    return await conn.query(sql, values);
};

//

//atualizando um cliente 
app.put('/clientes/:id', async (req,res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const result2 = await updateCliente(id, { nome:nome, idade:idade });

    const clientes = await selectCliente();
    return res.json(clientes);
});

//atualiza um registro na tabela clientes
async function updateCliente(id, cliente) {
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?, idade=? WHERE id=?;';
    const values = [cliente.nome, cliente.idade, id];
    return await conn.query(sql, values);

    // localhost:3000/clientes/3
    // {
    //     "nome": "Girafinha",
    //     "idade": 45
    // }
};

//

//excluindo um cliente
app.delete('/clientes/:id', async (req,res) => {
    const { id } = req.params;
    var result = await deleteCliente(id);
    return res.status(200).json({ message: `Registro excluido com sucesso!`});
});

//deletando um cliente da tabela
async function deleteCliente(id){
    const conn = await connect();
    const sql = 'DELETE FROM clientes WHERE id=?;';
    return await conn.query(sql, [id]);
};

