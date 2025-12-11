const model = require("../models/dashboardCaveModel");

async function listarCaves(req, res) {
    try {
        const idEmpresa = req.params.idEmpresa;
        if (!idEmpresa) return res.status(400).json({ erro: "idEmpresa é obrigatório" });

        const resultado = await model.listarCaves(idEmpresa);
        return res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro listarCaves:", erro);
        return res.status(500).json({ erro: "Erro ao listar caves" });
    }
}

async function ultimasLeituras(req, res) {
    try {
        const idCave = req.params.idCave;
        if (!idCave) return res.status(400).json({ erro: "idCave é obrigatório" });

        const resultado = await model.listarUltimasLeiturasPorCave(idCave);
        return res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ultimasLeituras:", erro);
        return res.status(500).json({ erro: "Erro ao buscar últimas leituras" });
    }
}

async function kpiUltimaLeitura(req, res) {
    try {
        const idCave = req.params.idCave;
        if (!idCave) return res.status(400).json({ erro: "idCave é obrigatório" });

        const rows = await model.ultimaLeituraDaCave(idCave);
        const registro = (rows && rows.length > 0) ? rows[0] : { temperatura: null, umidade: null };
        return res.status(200).json(registro);
    } catch (erro) {
        console.error("Erro kpiUltimaLeitura:", erro);
        return res.status(500).json({ erro: "Erro ao buscar KPI última leitura" });
    }
}

function listarKpiCave(req, res) {
    model.listarKpiCave(req.params.idCave)
        .then(r => res.json(r[0])) // retorna só 1 linha
        .catch(e => res.status(500).json(e));
}
module.exports = {
    listarCaves,
    ultimasLeituras,
    kpiUltimaLeitura,
    listarKpiCave
};
