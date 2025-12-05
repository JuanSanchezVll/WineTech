var database = require("../database/config")

async function listar(idEmpresa) {
    const instrucao = `
        SELECT
            id_cave AS id,
            identificacao
        FROM cave
        WHERE id_empresa = ${idEmpresa};
    `;

    return await database.execute(instrucao);
}

async function buscarPorId(idEmpresa, idCave) {
    const instrucao = `
        SELECT 
            id_cave AS id,
            identificacao
        FROM cave
        WHERE 
            id_empresa = ${idEmpresa}
            AND id_cave = ${idCave};
    `;

    return await database.execute(instrucao);
}

async function cadastrar(identificacao, idEmpresa) {
    const instrucao = `
        INSERT INTO cave (identificacao, id_empresa) VALUES
            ('${identificacao}', ${idEmpresa});
    `; 

    return await database.execute(instrucao);
}

async function atualizar(idCave, identificacao) {
    const instrucao = `
        UPDATE cave 
        SET identificacao = '${identificacao}'
        WHERE id_cave = ${idCave};
    `;
    return await database.execute(instrucao);
}

async function deletar(idCave) {
    const instrucao = `
    delete from cave where id_cave = '${idCave}';
    `
    return await database.execute(instrucao)
}

async function pesquisar(idEmpresa, pesquisa) {
    const instrucao = `
    select id_cave AS id, identificacao from cave
    where id_empresa = ${idEmpresa} and
    identificacao like '%${pesquisa}%' or
    id_cave like '%${pesquisa}%';
    `
    return await database.execute(instrucao)
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    pesquisar,
    buscarPorId
}