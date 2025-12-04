var barrilModel = require("../models/barrilModel");

async function listar(req, res) {
    try {
        const { idEmpresa, idCave } = req.query;

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        if (!idCave) {
            throw new Error("ID_CAVE_INDEFINIDO");
        }

        const resultado = await barrilModel.listar(idEmpresa, idCave);
        return res.status(200).json(resultado);
    } catch(err) {
        if (err === "ID_EMPRESA_INDEFINIDO") {
            console.error("Erro ao listar barris" + err);
            return res.status(400).json({ erro: "Erro interno no servidor. " + err });
        }

        if (err === "ID_CAVE_INDEFINIDO") {
            console.error("Erro ao listar barris" + err);
            return res.status(400).json({ erro: "Erro interno no servidor. " + err });
        }

        console.error("Erro ao listar barris" + err);
        return res.status(500).json({ erro: "Erro interno no servidor. " + err });
    }
}

module.exports = {
    listar
}