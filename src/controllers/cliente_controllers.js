const knex = require("../db/conexao");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const senhaJwt = process.env.JWT_PASS;

const cadastrarCliente = async (req, res) => {
    const { nome, email, senha, celular } = req.body;

    try {
        const criptografaSenha = await bcrypt.hash(senha, 10);

        const cadastro = await knex("cliente").insert({
            nome,
            email,
            senha: criptografaSenha,
            celular,
        })
            .returning(["id", "nome", "email", "celular"])

        return res.status(201).json(cadastro[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
}

const loginCliente = async (req, res) => {
    try {
        const cliente = req.cliente;

        const token = jwt.sign({ id: cliente.id }, senhaJwt, {
            expiresIn: "10h",
        });
        const { senha: _, ...clienteLogado } = cliente;

        return res.json({ cliente: clienteLogado, token });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." })
    }
}

module.exports = {
    cadastrarCliente,
    loginCliente
}