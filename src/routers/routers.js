const express = require("express")
const clienteControllers = require("../controllers/cliente_controllers")
const colaboradorControllers = require("../controllers/colaborador.controllers")
const middlewareCliente = require("../middlewares/cliente-middleware");
const schemaCadastroCliente = require("../utils/validarCampo");


const app = express();

app.post("/cliente", middlewareCliente.validarCadastro(schemaCadastroCliente),
    middlewareCliente.verificarEmailCliente,
    clienteControllers.cadastrarCliente)
//rota oara cadastrar cliente








app.post("/colaborador", colaboradorControllers.cadastrarColaborador)

module.exports = app