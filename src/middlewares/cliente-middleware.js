const knex = require("../db/conexao")
const { schema } = require("../utils/validarCampo")

const validarCadastro = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensagem: error.message })
    }
}

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
}



module.exports = {
    validarCadastro,
    verificarEmailCliente
}