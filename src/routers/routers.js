const express = require("express")

const rotasColaborador = require("./routers-colaborador");
const rotasClientes = require("./routers-clientes");

const app = express.Router();

app.use(rotasColaborador);
app.use(rotasClientes);



module.exports = app