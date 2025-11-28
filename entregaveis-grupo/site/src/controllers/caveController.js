var caveModel = require("../models/caveModel");

async function listar(req, res) {
    try {
        const { idEmpresa } = req.query;

        const resultado = await caveModel.listar(idEmpresa);

        return res.status(200).json(resultado);
    } catch (erro) {
        console.error("Não foi possível listar caves: " + erro);
    }
}

async function cadastrar(req, res) {
    try {
        const { idEmpresa, identificacao } = req.body;

        const resultado = await caveModel.cadastrar(identificacao, idEmpresa);

        return res.status(201).json(resultado);
    } catch (erro) {
        console.error("Não foi possível cadastrar cave: " + erro);
    }
}

async function atualizar(req, res) {
    try {
        const { idCave, identificacao } = req.body;

        const resultado = await caveModel.atualizar(idCave, identificacao);

        return res.status(201).json(resultado);
    } catch (erro) {
        console.log("erro: " + erro)
    }
}

async function deletar(req, res) {
    try {
        const { idCave } = req.query;

        console.log("estou no try")

        const resultado = await caveModel.deletar(idCave);

        return res.status(201).json(resultado);
    } catch (erro) {
        console.log("erro: " + erro)
    }

}

async function pesquisar(req, res) {
    try {
        const { idEmpresa, buscar } = req.query;

        console.log("estou no try")

        const resultado = await caveModel.pesquisar(idEmpresa, buscar);

        return res.status(201).json(resultado);
    } catch (erro) {
        console.log("erro: " + erro)
    }
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    pesquisar
}