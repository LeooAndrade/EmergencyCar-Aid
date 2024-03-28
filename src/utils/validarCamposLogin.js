const joi = require("joi");

const schemaLoginCliente = joi.object({
    email: joi.string().email().required().messages({
        "any.required": "O campo email é obrigatório.",
        "string.email": "O formato email é inválido.",
        "string.empty": "O campo email está vázio.",
    }),
    senha: joi.string().required().messages({
        "any.required": "O campo senha é obrigatório.",
        "string.empty": "O campo senha está vázio."
    })
})

module.exports = schemaLoginCliente