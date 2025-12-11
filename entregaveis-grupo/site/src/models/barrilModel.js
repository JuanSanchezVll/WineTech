var database = require("../database/config");

async function listar(idEmpresa) {
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
        ORDER BY
            b.id_barril ASC
    `;

    return await database.execute(instrucaoSql);
}

async function listarPorIdCave(idEmpresa, idCave) {
    const instrucaoSql = `
        SELECT 
            b.id_barril,
            b.identificacao
        FROM barril b
        JOIN cave c ON b.id_cave = c.id_cave
        WHERE 
            c.id_empresa = ${idEmpresa}
            AND b.id_cave = ${idCave}
    `;

    return await database.execute(instrucaoSql);
}


async function buscarPorId(idEmpresa, idBarril) {
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

async function atualizar(identificacao, idCave, idUva, idBarril) {
    const instrucao = `
        UPDATE barril
        SET
            identificacao = '${identificacao}',
            id_cave = ${idCave},
            id_uva = ${idUva}
        WHERE id_barril = ${idBarril}
    `
    return await database.execute(instrucao)
}

async function deletar(idBarril) {
    const instrucao = `
        DELETE FROM barril WHERE id_barril = ${idBarril}
    `
    return await database.execute(instrucao)
}

async function pesquisar(idEmpresa, pesquisa) {
    const instrucao = `
        SELECT 
            b.id_barril as id,
            b.identificacao,
            c.identificacao AS cave_associada,
            u.nome AS uva_armazenada
        FROM barril b
        JOIN cave c ON b.id_cave = c.id_cave
        JOIN uva u ON b.id_uva = u.id_uva
        WHERE 
            (
                b.id_barril LIKE '%${pesquisa}%' OR
                b.identificacao LIKE '%${pesquisa}%' OR
                c.identificacao LIKE '%${pesquisa}%' OR
                u.nome LIKE '%${pesquisa}%'
            )
            AND c.id_empresa = ${idEmpresa}
        ORDER BY
            b.id_barril ASC
    `
    return await database.execute(instrucao)
}

module.exports = {
    listar,
    listarPorIdCave,
    cadastrar,
    buscarPorId,
    atualizar,
    deletar,
    pesquisar
}