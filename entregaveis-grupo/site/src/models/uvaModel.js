var database = require("../database/config");

async function listar(idEmpresa) {
    const instrucaoSql = `
        SELECT 
            id_uva,
            nome, 
            temperatura_minima, 
            temperatura_maxima, 
            umidade_minima, 
            umidade_maxima
        FROM uva 
        WHERE id_empresa = ${idEmpresa};
    `;

    return await database.execute(instrucaoSql);
}

async function cadastrar(idEmpresa, nome, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima) {
    const instrucaoSql = `
        INSERT INTO uva (id_empresa, nome, temperatura_minima, temperatura_maxima, umidade_minima, umidade_maxima) VALUES
            (${idEmpresa}, '${nome}', ${temperaturaMinima}, ${temperaturaMaxima}, ${umidadeMinima}, ${umidadeMaxima});
    `;

    return await database.execute(instrucaoSql);
}

async function atualizar(idUva, nome, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima) {
    const instrucaoSql = `
        UPDATE uva 
        SET 
            nome = '${nome}',
            temperatura_minima = ${temperaturaMinima},
            temperatura_maxima = ${temperaturaMaxima},
            umidade_minima = ${umidadeMinima},
            umidade_maxima = ${umidadeMaxima}
        WHERE id_uva = ${idUva};
    `;

    return await database.execute(instrucaoSql);
}

async function deletar(idUva) {
    const instrucaoSql = `
        DELETE FROM uva WHERE id_uva = ${idUva};
    `;

    return await database.execute(instrucaoSql);
}

async function pesquisar(idEmpresa, pesquisa) {
    const instrucaoSql = `
        SELECT
            id_uva,
            nome, 
            temperatura_minima, 
            temperatura_maxima, 
            umidade_minima, 
            umidade_maxima
        FROM uva
        WHERE
            (
                id_uva LIKE '%${pesquisa}%' OR
                nome LIKE '%${pesquisa}%' OR
                temperatura_minima LIKE '%${pesquisa}%' OR
                temperatura_maxima LIKE '%${pesquisa}%' OR
                umidade_minima LIKE '%${pesquisa}%' OR
                umidade_maxima LIKE '%${pesquisa}%'
            ) 
            AND id_empresa = ${idEmpresa};
    `;

    return await database.execute(instrucaoSql);
}

async function buscarPorId(idEmpresa, idUva) {
    const instrucaoSql = `
        SELECT 
            id_uva,
            nome, 
            temperatura_minima, 
            temperatura_maxima, 
            umidade_minima, 
            umidade_maxima
        FROM uva 
        WHERE 
            id_empresa = ${idEmpresa}
            AND id_uva = ${idUva};
    `;

    return await database.execute(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    pesquisar,
    buscarPorId
}