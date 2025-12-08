var database = require("../database/config")

function listarBarris(idEmpresa) {
    var instrucao = `
        SELECT b.id_barril, b.identificacao 
        FROM barril b
        JOIN cave c ON b.id_cave = c.id_cave
        WHERE c.id_empresa = ${idEmpresa};
    `;
    return database.execute(instrucao);
}

function buscarMedidas(idBarril) {
    var instrucao = `
        SELECT 
            l.temperatura, 
            l.umidade, 
            l.data_hora_registro,
            DATE_FORMAT(l.data_hora_registro, '%H:%i') as momento_grafico
        FROM leitura l
        JOIN sensor s ON l.id_sensor = s.id_sensor
        WHERE s.id_barril = ${idBarril}
        ORDER BY l.id_leitura DESC 
        LIMIT 24;
    `;
    return database.execute(instrucao);
}

function buscarAlertas(idBarril) {
    var instrucao = `
        SELECT count(a.id_alerta) as qtd_alertas
        FROM alerta a
        JOIN leitura l ON a.id_leitura = l.id_leitura
        JOIN sensor s ON l.id_sensor = s.id_sensor
        WHERE s.id_barril = ${idBarril}
        AND l.data_hora_registro >= NOW() - INTERVAL 1 HOUR;
    `;
    return database.execute(instrucao);
}

module.exports = {
    listarBarris,
    buscarMedidas,
    buscarAlertas
};