const express = require('express');
const { connect } = require('../config/db.js');


const modelCliente = {

    selecionarTodosClientes: async () => {
        try {
            const conn = await connect();
            const [rows] = await conn.query('select * from clientes;');
            return rows;
        } catch (error) {
            throw error;
        }
    },
    selecionaClientePeloID: async (id) => {
        try {
            const conn = await connect();
            const sql = 'SELECT * FROM clientes WHERE id=?;';
            const values = id;
            const [rows] = await conn.query(sql, values);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    criaGente: async (cliente) => {
        try {
            const conn = await connect();
            const sql = 'INSERT INTO clientes(nome,idade) VALUES (?,?);'; //onde tem interrogação a biblioteca reconhece que ali vamos colocar algo
            const values = [cliente.nome, cliente.idade];
            return await conn.query(sql, values);
        } catch (error) {
            throw error;
        }
    },
    atualizaGente: async (id, cliente) => {
        const conn = await connect();
        const sql = 'UPDATE clientes SET nome=?, idade=? WHERE id=?;';
        const values = [cliente.nome, cliente.idade, id];
        return await conn.query(sql, values);
    },
    deletaGente: async (id) => {
        const conn = await connect();
        const sql = 'DELETE FROM clientes WHERE id=?;';
        return await conn.query(sql, [id]);
    }


}

module.exports = modelCliente;