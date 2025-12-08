var database = require("../database/config");

async function listarAlertasPorCaveNoMes(idEmpresa) {
    const instrucao = `
        SELECT
            alertas,
            identificacao
        FROM vw_alertas_por_cave
        WHERE id_empresa = ${idEmpresa}
    `;

    return await database.execute(instrucao);
}

async function obterTotalAlertasNoMes(idEmpresa) {
    const instrucao = `
        SELECT
            SUM(alertas) AS total_alertas
        FROM vw_alertas_por_cave
        WHERE id_empresa = ${idEmpresa}
    `;

    return await database.execute(instrucao);
}

async function obterUltimaLeituraNoBarril(idEmpresa, idCave, idBarril) {
    const instrucao = `
        SELECT
            l.temperatura,
            l.umidade
        FROM leitura l
        JOIN sensor s ON l.id_sensor = s.id_sensor
        JOIN barril b ON b.id_barril = s.id_barril
        JOIN cave c ON b.id_cave = c.id_cave
        JOIN empresa e ON c.id_empresa = e.id_empresa
        WHERE
            e.id_empresa = ${idEmpresa}
            AND c.id_cave = ${idCave}
            AND b.id_barril = ${idBarril}
        ORDER BY l.data_hora_registro DESC
        LIMIT 1;
    `;    

    return await database.execute(instrucao);
}

module.exports = {
    listarAlertasPorCaveNoMes,
    obterTotalAlertasNoMes,
    obterUltimaLeituraNoBarril
}