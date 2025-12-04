var barrilModel = require("../models/barrilModel");

async function listar(req, res) {
    try {
        const { idEmpresa, idCave, idBarril } = req.query;

        if (!idEmpresa) {
            throw new Error("ID_EMPRESA_INDEFINIDO");
        }

        if (!idCave) {
            throw new Error("ID_CAVE_INDEFINIDO");
        }

        if (idBarril) {
            const resultado = await barrilModel.buscarPorId(idEmpresa, idCave, idBarril);
            return res.status(200).json(resultado);
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

async function cadastrar(req, res) {
    try {
        const { identificacao, idCave, idUva } = req.body;

        if (!idCave) {
            throw new Error("ID_CAVE_INDEFINIDO");
        }

        if (!idUva) {
            throw new Error("ID_UVA_INDEFINIDO");
        }

        const resultado = await barrilModel.cadastrar(identificacao, idCave, idUva);
        return res.status(200).json(resultado);
    } catch(err) {
        if (err === "ID_CAVE_INDEFINIDO") {
            console.error("Erro ao cadastrar barril" + err);
            return res.status(400).json({ erro: "Erro interno no servidor. " + err });
        }

        if (err === "ID_UVA_INDEFINIDO") {
            console.error("Erro ao cadastrar barril" + err);
            return res.status(400).json({ erro: "Erro interno no servidor. " + err });
        }

        console.error("Erro ao cadastrar barril" + err);
        return res.status(500).json({ erro: "Erro interno no servidor. " + err });
    }
}

async function atualizar(req, res) {
    try {
        const { identificacao, idCave, idUva, idBarril } = req.body;

        if (!idBarril) {
            throw new Error("ID_BARRIL_INDEFINIDO");
        }

        if (!idCave) {
            throw new Error("ID_CAVE_INDEFINIDO");
        }

        if (!idUva) {
            throw new Error("ID_UVA_INDEFINIDO");
        }

        const resultado = await barrilModel.atualizar(identificacao, idCave, idUva, idBarril);
        return res.status(200).json(resultado);
    } catch(err) {
        if (err === "ID_BARRIL_INDEFINIDO") {
            console.error("Erro ao atualizar barril" + err);
            return res.status(400).json({ erro: "Erro interno no servidor. " + err });
        }

        if (err === "ID_CAVE_INDEFINIDO") {
            console.error("Erro ao atualizar barril" + err);
            return res.status(400).json({ erro: "Erro interno no servidor. " + err });
        }

        if (err === "ID_UVA_INDEFINIDO") {
            console.error("Erro ao atualizar barril" + err);
            return res.status(400).json({ erro: "Erro interno no servidor. " + err });
        }

        console.error("Erro ao atualizar barril" + err);
        return res.status(500).json({ erro: "Erro interno no servidor. " + err });
    }
}


async function pesquisar(req, res) {
    try {
        const { idCave, pesquisa } = req.query;

        const resultado = await barrilModel.pesquisar(idCave, pesquisa);

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
    pesquisar
}