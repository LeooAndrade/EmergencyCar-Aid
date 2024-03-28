const express = require("express")
const clienteControllers = require("../controllers/cliente_controllers")
const middlewareCliente = require("../middlewares/cliente-middleware");
const schemaCadastroCliente = require("../utils/validarCampo");
const controllersCliente = require("../controllers/cliente_controllers")
const validarLogin = require("../utils/validarCamposLogin")

const clientesRotas = express.Router();

clientesRotas.post("/cliente", middlewareCliente.validarCadastro(schemaCadastroCliente),
    middlewareCliente.verificarEmailCliente,
    clienteControllers.cadastrarCliente)
//rota oara cadastrar cliente

clientesRotas.post("/login",
    middlewareCliente.validarCampos(validarLogin),
    middlewareCliente.validarLoginCliente,
    controllersCliente.loginCliente
)

module.exports = clientesRotas