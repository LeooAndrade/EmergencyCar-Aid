const knex = require("../db/conexao");
//const { schema } = require("../utils/validarCampo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = process.env.JWT_PASS;

const validarCadastro = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensagem: error.message })
    }
};

const verificarEmailCliente = async (req, res, next) => {
    try {
        const { email } = req.body

        const emailExistente = await knex("cliente")
            .select("id", "email")
            .from("cliente")
            .where("email", email)
            .first();
        if (req.method === "POST" && emailExistente) {
            return res.status(401).json({
                mensagem: "E-mail já está sendo utilizado."
            })
        }
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro interno do Servidor",
        });
    }
};

const validarTokenCliente = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            mensagem: "Para acessar este recurso utilize um token válido."
        });
    }
    const token = authorization.split(" ")[1];

    try {
        const tokenUsuario = jwt.verify(token, senhaJwt)

        req.usuarioId = tokenUsuario.id;
        next()
    } catch (error) {
        return res.status(401).json({
            mensagem: "token inválido"
        })
    }

};

const validarLoginCliente = async (req, res, next) => {
    const { email, senha } = req.body;
    try {
        const cliente = await knex("cliente")
            .select("*")
            .from("cliente")
            .where("email", "=", email)
            .first();
        if (!cliente) {
            return res.status(401).json({ mensagem: "Email ou senha inválidos" })
        }
        const confirmarSenha = await bcrypt.compare(senha, cliente.senha)
        if (!confirmarSenha) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            })
        }
        req.cliente = cliente;

        return next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
};

const validarCampos = (joiSchema) => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}




module.exports = {
    validarCadastro,
    verificarEmailCliente,
    validarTokenCliente,
    validarCampos,
    validarLoginCliente
}