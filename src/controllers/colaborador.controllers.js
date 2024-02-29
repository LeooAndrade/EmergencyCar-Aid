const knex = require("../db/conexao");
const bcrypt = require("bcrypt");

const cadastrarColaborador = async (req, res) => {
    const { nome, servico, email, senha, celular, endereco } = req.body

    try {
        const criptografaSenha = await bcrypt.hash(senha, 10);

        const cadastroColaborador = await knex("prestador_de_servicos").insert({
            nome,
            servico,
            email,
            senha: criptografaSenha,
            celular,
            endereco
        }).returning(["id", "nome", "servico", "email", "celular"])
        return res.status(201).json(cadastroColaborador[0])
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
}

module.exports = {
    cadastrarColaborador
}