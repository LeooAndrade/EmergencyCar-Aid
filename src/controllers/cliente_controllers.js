const knex = require("../db/conexao");
const bcrypt = require("bcrypt")

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

module.exports = {
    cadastrarCliente
}