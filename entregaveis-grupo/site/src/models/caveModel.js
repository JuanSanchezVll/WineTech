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

async function cadastrar(identificacao, idEmpresa) {
    const instrucao = `
        INSERT INTO cave (identificacao, id_empresa) VALUES
            ('${identificacao}', ${idEmpresa});
    `; 

    return await database.execute(instrucao);
}

async function atualizar(idCave, identificacao) {
    const instrucao = `
    update cave set identificacao = '${identificacao}'
    where id_cave = ${idCave};
    `
    return await database.execute(instrucao)
}

async function deletar(idCave) {
    const instrucao = `
    delete from cave where id_cave = '${idCave}';
    `
    return await database.execute(instrucao)
}

async function pesquisar(idEmpresa, buscar) {
    const instrucao = `
    select id_cave, identificacao from cave
    where id_empresa = ${idEmpresa} and
    identificacao like '%${buscar}%' or
    id_cave like '%${buscar}%';
    `
    return await database.execute(instrucao)
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    pesquisar
}