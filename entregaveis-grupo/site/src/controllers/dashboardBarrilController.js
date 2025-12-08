var barrilModel = require("../models/dashboardBarrilModel");

async function listarBarris(req, res) {
    try {
        const idEmpresa = req.params.idEmpresa;
        const resultado = await barrilModel.listarBarris(idEmpresa);

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }

    } catch (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    }
}

async function buscarMedidas(req, res) {
    try {
        const idBarril = req.params.idBarril;

        const [medidas, alertas] = await Promise.all([
            barrilModel.buscarMedidas(idBarril),
            barrilModel.buscarAlertas(idBarril)
        ]);

        if (medidas.length > 0) {
            res.status(200).json({
                medidas: medidas,
                alertas: alertas[0].qtd_alertas
            });
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }

    } catch (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    }
}

async function buscarMedidas(req, res) {
    try {

        tempMax = req.body.tempMax
        umidMax = req.body.UmidMax

        if (medidas.length > 0) {
            res.status(200).json({
            });
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }

    } catch (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    }
}

module.exports = {
    listarBarris,
    buscarMedidas
};
