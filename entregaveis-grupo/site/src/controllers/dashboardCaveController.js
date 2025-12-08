const dashboardCaveModel = require("../models/dashboardCaveModel");

async function listar(req, res) {
    const idEmpresa = req.params.idEmpresa;

    try {
        const resultado = await dashboardCaveModel.listarInfos(idEmpresa);

        if (resultado.length === 0) {
            return res.status(204).send("Nenhuma informação encontrada.");
        }

        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro no dashboardCaveController:", erro);
        res.status(500).json(erro);
    }
}

module.exports = {
    listar
};
