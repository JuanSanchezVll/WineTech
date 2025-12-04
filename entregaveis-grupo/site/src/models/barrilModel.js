var database = require("../database/config");

async function listar(idEmpresa, idCave) {
    const instrucaoSql = `
        SELECT 
            b.id_barril as id,
            b.identificacao,
            c.identificacao AS cave_associada,
            u.nome AS uva_armazenada
        FROM barril b
        JOIN cave c ON b.id_cave = c.id_cave
        JOIN uva u ON b.id_uva = u.id_uva
        WHERE 
            c.id_empresa = ${idEmpresa}
            AND b.id_cave = ${idCave}
        ORDER BY
            b.id_barril ASC
    `;

    return await database.execute(instrucaoSql);
}

async function buscarPorId(idEmpresa, idCave, idBarril) {
    const instrucaoSql = `
        SELECT 
            b.id_barril as id,
            b.identificacao,
            c.identificacao AS cave_associada,
            u.nome AS uva_armazenada
        FROM barril b
        JOIN cave c ON b.id_cave = c.id_cave
        JOIN uva u ON b.id_uva = u.id_uva
        WHERE 
            c.id_empresa = ${idEmpresa}
            AND b.id_cave = ${idCave}
            AND b.id_barril = ${idBarril};
    `;

    return await database.execute(instrucaoSql);
}

async function cadastrar(identificacao, idCave, idUva) {
    const instrucaoSql = `
        INSERT INTO barril (identificacao, id_cave, id_uva) VALUES
            ('${identificacao}', ${idCave}, ${idUva});
    `;

    return await database.execute(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    buscarPorId
}