const joi = require("joi");

const schemaCadastroCliente = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório.",
        "string.empty": "O campo nome não pode ser vázio."
    }),
    email: joi.string().email().required().messages({
        "any.required": "O campo email é obrigatório.",
        "string.email": "O formato de email é inválido.",
        "string.empty": "O campo email não pode estar vázio."
    }),
    senha: joi.string().required().min(8).max(25).messages({
        "any.required": "O campo senha é obrigatório.",
        "string.empty": "O campo senha não pode ser vázio",
        "string.min": "Sua senha deve ter no miníno 8 caracteres",
        "string.max": "Sua senha contem mais de 25 caracteres"
    }),
    celular: joi.string().required().min(11).max(11).messages({
        "any.required": "O campo celular é obrigatório",
        "string.empty": "O campo celular não pode ser vázio",
        "string.min": "Verifique o seu número e tente novamente.",
        "string.max": "verifique o seu número e tente novamente."
    })
})

module.exports = schemaCadastroCliente