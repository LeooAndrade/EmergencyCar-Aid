const express = require("express")
const clienteControllers = require("../controllers/cliente_controllers")
const colaboradorControllers = require("../controllers/colaborador.controllers")

const app = express();

app.post("/cliente", clienteControllers.cadastrarCliente)
//rota oara cadastrar cliente
app.post("/colaborador", colaboradorControllers.cadastrarColaborador)

module.exports = app