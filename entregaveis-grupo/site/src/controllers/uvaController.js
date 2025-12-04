var uvaModel = require("../models/uvaModel");

async function listar(req, res) {
    try {
        const { idEmpresa, idUva } = req.query;

        if (idEmpresa && idUva) {
            const resultado = await uvaModel.buscarPorId(idEmpresa, idUva);
            return res.status(200).json(resultado);
        }

        const resultado = await uvaModel.listar(idEmpresa);
        return res.status(200).json(resultado);
    } catch(err) {
        console.error("Erro ao listar tipos de uva" + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}

async function cadastrar(req, res) {
    try {
        const { 
                idEmpresa, 
                nome, 
                temperaturaMinima, 
                temperaturaMaxima, 
                umidadeMinima, 
                umidadeMaxima 
        } = req.body;

        const resultado = await uvaModel.cadastrar(idEmpresa, nome, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima);
        return res.status(200).json(resultado);
    } catch(err) {
        console.error("Erro ao cadastrar uva: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}

async function atualizar(req, res) {
    try {
        const { 
                idUva, 
                nome, 
                temperaturaMinima, 
                temperaturaMaxima, 
                umidadeMinima, 
                umidadeMaxima 
        } = req.body;

        const resultado = await uvaModel.atualizar(idUva, nome, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima);

        return res.status(200).json(resultado);
    } catch(err) {
        console.error("Erro ao atualizar uva: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err});
    }
}

async function deletar(req,res) {
    try {
        const { idUva } = req.query;

        const resultado = await uvaModel.deletar(idUva);

        return res.status(200).json(resultado);
    } catch(err) {
        console.error("Erro ao deletar uva: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}

async function pesquisar(req, res) {
    try {
        const { idEmpresa, pesquisa } = req.query;

        const resultado = await uvaModel.pesquisar(idEmpresa, pesquisa);

        return res.status(200).json(resultado);
    } catch(err) {
        console.error("Erro ao pesquisar uva: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    pesquisar
}