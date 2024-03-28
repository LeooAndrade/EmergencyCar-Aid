const knex = require("knex")

const verificarEmailColaborador = async (req, res, next) => {
    try {
        const { email } = req.body;
        const emailExistente = await knex("prestador_de_servicos")
            .select("*")
            .from("prestador_de_servicos")
            .where("email", "=", email)
            .first();
        if (req.method === "POST" && emailExistente) {
            return res.status(401).json({
                mensage: "Email já está sendo utilizado."
            })
        }
        return next()
    } catch (error) {

    }
}


module.exports = {
    verificarEmailColaborador
}