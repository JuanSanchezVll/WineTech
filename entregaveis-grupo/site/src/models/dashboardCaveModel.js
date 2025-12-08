const database = require("../database/config");

function listarCaves(idEmpresa) {
    const instrucao = `
        SELECT DISTINCT id_cave, cave AS identificacao
        FROM vw_infos
        WHERE id_empresa = ?;
    `;
    return database.execute(instrucao, [idEmpresa]);
}

function listarUltimasLeiturasPorCave(idCave) {
    const instrucao = `
        SELECT
            v.id_barril,
            v.barril,
            v.temperatura,
            v.umidade,
            v.id_leitura
        FROM vw_infos v
        JOIN (
            SELECT id_barril, MAX(id_leitura) AS ultima
            FROM vw_infos
            WHERE id_cave = ?
            GROUP BY id_barril
        ) ult ON ult.id_barril = v.id_barril AND ult.ultima = v.id_leitura
        WHERE v.id_cave = ?
        ORDER BY v.id_barril;
    `;
    return database.execute(instrucao, [idCave, idCave]);
}

function ultimaLeituraDaCave(idCave) {
    const instrucao = `
        SELECT temperatura, umidade, id_leitura
        FROM vw_infos
        WHERE id_cave = ?
        ORDER BY id_leitura DESC
        LIMIT 1;
    `;
    return database.execute(instrucao, [idCave]);
}


function listarKpiCave(idCave) {
    const q = `
        SELECT 
            MAX(v.temperatura) AS maiorTemperatura,
            MAX(v.umidade) AS maiorUmidade
        FROM vw_infos v
        JOIN (
            SELECT id_barril, MAX(id_leitura) AS ultima
            FROM vw_infos
            WHERE id_cave = ?
            GROUP BY id_barril
        ) u ON u.id_barril = v.id_barril AND u.ultima = v.id_leitura
        WHERE v.id_cave = ?;
    `;

    return database.execute(q, [idCave, idCave]);
}

module.exports = {
    listarKpiCave,
    listarCaves,
    listarUltimasLeiturasPorCave,
    ultimaLeituraDaCave
};
