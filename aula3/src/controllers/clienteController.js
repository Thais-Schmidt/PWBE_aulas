const clienteModel = require('../models/clienteModel');

const clienteController = {

    //retorna todos os clientes na tabela clientes
    chamaMetodoParaSelecionarTodosClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.selecionarTodosClientes();
            return res.json(clientes);
        } catch (error) {
            throw error;
        }
    },

    //retorna o cliente com base no id
    selecionaClientePeloID: async (req, res) => {
        try {
            const { id } = req.params;
            const clienteID = await clienteModel.selecionaClientePeloID(id);
            return res.json(clienteID);
        } catch (error) {
            throw error;
        }
    },

    //cria um novo registro
    criaGente: async (req, res) => {
        try {
            const { nome, idade } = req.body;
            const result = await clienteModel.criaGente({ nome: nome, idade: idade });
            const cliente = await clienteModel.selecionarTodosClientes();
            return res.json(cliente);
        } catch (error) {
            throw error;
        }
    },

    //atualiza o registro
    atualizaGente: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, idade } = req.body;
            const result2 = await clienteModel.atualizaGente(id, { nome: nome, idade: idade });
            const clientes = await clienteModel.selecionarTodosClientes();
            return res.json(clientes);
        } catch (error) {
            throw error;
        }
    },

    //deleta registro
    deletaGente: async (req, res) => {
        try {
            const { id } = req.params;
            //var result = await clienteModel.deletaGente(id);
            return res.status(200).json({ message: `Registro excluido com sucesso!` });
            //setRefresh(prevState => !prevState);
            //exibeAlert();
        } catch (error) {
            throw error;
        }
    }

}

module.exports = { clienteController };