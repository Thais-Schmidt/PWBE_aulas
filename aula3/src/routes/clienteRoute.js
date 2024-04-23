const express = require('express');

const router = express.Router();

const {clienteController} = require("../controllers/clienteController");

router.get("/clientes", clienteController.chamaMetodoParaSelecionarTodosClientes);
router.get("/clientes/:id", clienteController.selecionaClientePeloID);
router.post("/clientes", clienteController.criaGente);
router.put("/clientes/:id", clienteController.atualizaGente);
router.delete("/clientes/:id", clienteController.deletaGente);

module.exports = router;