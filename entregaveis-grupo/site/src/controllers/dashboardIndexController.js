var dashboardIndexModel = require("../models/dashboardIndexModel");

async function listarAlertasPorCaveNoMes(req, res) {
    try {
        const { idEmpresa } = req.params;

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        const resultado = await dashboardIndexModel.listarAlertasPorCaveNoMes(idEmpresa);

        return res.status(200).json(resultado);
    } catch (erro) {
        console.error(erro);

        if (erro === "ID_EMPRESA_INDEFINIDO") {
            return res.status(400).json("Erro: ID_EMPRESA não foi enviado.");
        }

        return res.status(500).json("Erro interno no servidor.");
    }
}

async function obterTotalAlertasNoMes(req, res) {
    try {
        const { idEmpresa } = req.params;

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        const resultado = await dashboardIndexModel.obterTotalAlertasNoMes(idEmpresa);

        return res.status(200).json(resultado);
    } catch (erro) {
        console.error(erro);

        if (erro === "ID_EMPRESA_INDEFINIDO") {
            return res.status(400).json("Erro: ID_EMPRESA não foi enviado.");
        }

        return res.status(500).json("Erro interno no servidor.");
    }
}

async function obterCaveComAlertaTemperatura() {

}

async function obterCaveComAlertaUmidade() {

}

async function obterUltimaLeituraNoBarril(req, res) {
    try {
        const idEmpresa = req.params.idEmpresa;
        const idCave = req.params.idCave;
        const idBarril = req.params.idBarril;

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        if (!idCave) {
            throw new Error("ID_CAVE_INDEFINIDO");
        }

        if (!idBarril) {
            throw new Error("ID_BARRIL_INDEFINIDO");
        }

        const resultado = await dashboardIndexModel.obterUltimaLeituraNoBarril(idEmpresa, idCave, idBarril);

        return res.status(200).json(resultado);
    } catch (erro) {
        console.error(erro);

        if (erro === ID_EMPRESA_INDEFINIDO) {
            return res.status(400).json("ID da empresa não foi informado");
        }

        if (erro === ID_CAVE_INDEFINIDO) {
            return res.status(400).json("ID da cave não foi informado");
        }

        if (erro === ID_BARRIL_INDEFINIDO) {
            return res.status(400).json("ID do barril não foi informado");
        }

        return res.status(500).json("Erro interno no servidor");
    }
}


async function obterCaveComAlertaTemperatura(req, res) {
    try {
        const { idEmpresa } = req.params;
        if (!idEmpresa) throw new Error("ID_EMPRESA_INDEFINIDO");

        const resultado = await dashboardIndexModel.obterCaveComAlertaTemperatura(idEmpresa);
        return res.status(200).json(resultado);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json("Erro interno no servidor.");
    }
}

async function obterCaveComAlertaUmidade(req, res) {
    try {
        const { idEmpresa } = req.params;
        if (!idEmpresa) throw new Error("ID_EMPRESA_INDEFINIDO");

        const resultado = await dashboardIndexModel.obterCaveComAlertaUmidade(idEmpresa);
        return res.status(200).json(resultado);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json("Erro interno no servidor.");
    }
}

module.exports = {
    obterTotalAlertasNoMes,
    listarAlertasPorCaveNoMes,
    obterUltimaLeituraNoBarril,
    obterCaveComAlertaTemperatura,
    obterCaveComAlertaUmidade
}