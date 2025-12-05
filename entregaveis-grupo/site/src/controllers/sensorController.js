var caveModel = require("../models/caveModel");

async function listar(req, res) {
    try {
        const { idEmpresa, pesquisa, idsensor} = req.query;

        if (idEmpresa && idCave) {
            const resultado = await caveModel.buscarPorId(idEmpresa, pesquisa, idsensor);
            return res.status(200).json(resultado);
        }

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        const resultado = await caveModel.listar(idEmpresa);
        return res.status(200).json(resultado);
    } catch (err) {
        if (err === "ID_EMPRESA_INDEFINIDO") {
            console.error("Não foi possível listar caves: " + err);
            return res.status(400).json({ mensagem: "Erro ID da empresa não foi informado", erro: err});
        }

        console.error("Não foi possível listar caves: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err});
    }
}

async function pesquisar(req, res) {
    try {
        const { idEmpresa, pesquisa, idsensor } = req.query;

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        const resultado = await caveModel.pesquisar(idEmpresa, pesquisa, idsensor);
        return res.status(200).json(resultado);
    } catch (err) {
        if (err === "ID_EMPRESA_INDEFINIDO") {
            console.error("Não foi possível pesquisar por caves: " + err);
            return res.status(400).json({ mensagem: "Erro ID da empresa não foi informado", erro: err});
        }

        console.log("Erro ao pesquisar por cave: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}


async function cadastrar(req, res) {
    try {
        const { idEmpresa, idsensor } = req.body;

        const resultado = await caveModel.cadastrar(idEmpresa, idsensor);

        return res.status(201).json(resultado);
    } catch (err) {
        console.error("Não foi possível cadastrar cave: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}

async function atualizar(req, res) {
    try {
        const { idCave, identificacao } = req.body;

        const resultado = await caveModel.atualizar(idCave, identificacao);

        return res.status(201).json(resultado);
    } catch (err) {
        console.log("Erro ao atualizar cave: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err});
    }
}

async function deletar(req, res) {
    try {
        const { idCave } = req.query;

        if (!idCave) {
            throw new Error("ID_CAVE_INDEFINIDO");
        }

        const resultado = await caveModel.deletar(idCave);

        return res.status(201).json(resultado);
    } catch (err) {
        if (err === "ID_CAVE_INDEFINIDO") {
            console.error("Não foi possível deletar cave: " + err);
            return res.status(400).json({ mensagem: "Erro ID da cave não foi informado", erro: err});
        }

        console.log("Erro ao deletar cave: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err});
    }

}


module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    pesquisar
}