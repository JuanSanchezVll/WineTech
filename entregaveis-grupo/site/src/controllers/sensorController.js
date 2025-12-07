var sensorModel = require("../models/sensorModel");

async function listar(req, res) {
    try {
        const { idEmpresa, idSensor } = req.query;

        if (idSensor) {
            const resultado = await sensorModel.buscarPorId(idSensor);
            return res.status(200).json(resultado);
        }

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        const resultado = await sensorModel.listar(idEmpresa);
        return res.status(200).json(resultado);
        
    } catch (err) {
        if (err.message === "ID_EMPRESA_INDEFINIDO") {
            return res.status(400).json({ mensagem: "ID da empresa não informado", erro: err});
        }
        console.error("Não foi possível listar sensores: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err});
    }
}

async function pesquisar(req, res) {
    try {
        const { idEmpresa, pesquisa } = req.query;

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        const resultado = await sensorModel.pesquisar(idEmpresa, pesquisa);
        return res.status(200).json(resultado);
    } catch (err) {
        if (err.message === "ID_EMPRESA_INDEFINIDO") {
            return res.status(400).json({ mensagem: "Erro ID da empresa não foi informado", erro: err});
        }
        console.error("Erro ao pesquisar sensor: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}

async function cadastrar(req, res) {
    try {
        const { identificacao, idBarril } = req.body;

        if (!identificacao || !idBarril) {
             return res.status(400).json({ mensagem: "Dados incompletos (Nome ou Barril faltando)" });
        }

        const resultado = await sensorModel.cadastrar(identificacao, idBarril);

        return res.status(201).json(resultado);
    } catch (err) {
        console.error("Não foi possível cadastrar sensor: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}

async function atualizar(req, res) {
    try {
        const { idSensor, identificacao, idBarril } = req.body;

        const resultado = await sensorModel.atualizar(idSensor, identificacao, idBarril);

        return res.status(201).json(resultado);
    } catch (err) {
        console.error("Erro ao atualizar sensor: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err});
    }
}

async function deletar(req, res) {
    try {
        const { idSensor } = req.query;

        if (!idSensor) {
            throw new Error("ID_SENSOR_INDEFINIDO");
        }

        const resultado = await sensorModel.deletar(idSensor);

        return res.status(200).json(resultado);
    } catch (err) {
        if (err.message === "ID_SENSOR_INDEFINIDO") { 
            return res.status(400).json({ mensagem: "ID do sensor não foi informado", erro: err});
        }

        console.error("Erro ao deletar sensor: " + err);
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