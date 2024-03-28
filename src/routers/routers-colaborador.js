const express = require("express")

const colaboradorControllers = require("../controllers/colaborador.controllers")
const colaboradorMiddlewares = require("../middlewares/prestador-middleware")
const colaboradorRotas = express.Router();


colaboradorRotas.post("/colaborador", colaboradorControllers.cadastrarColaborador,
    colaboradorMiddlewares.verificarEmailColaborador)





module.exports = colaboradorRotas