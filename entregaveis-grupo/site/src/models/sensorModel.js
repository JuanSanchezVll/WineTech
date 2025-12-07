var database = require("../database/config")

async function listar(idEmpresa) {
    const instrucao = `
        SELECT 
            s.id_sensor AS idSensor,
            s.identificacao AS nomeSensor, -- Dei um apelido melhor pra usar no front
            s.id_barril AS idBarril,
            b.identificacao AS nomeBarril,
            c.identificacao AS nomeCave
        FROM sensor s
        JOIN barril b ON s.id_barril = b.id_barril
        JOIN cave c ON b.id_cave = c.id_cave
        WHERE c.id_empresa = ${idEmpresa};
    `;
    return await database.execute(instrucao);
}

async function buscarPorId(idSensor) {
    const instrucao = `
        SELECT 
            id_sensor AS idSensor,
            identificacao,
            id_barril AS idBarril
        FROM sensor
        WHERE id_sensor = ${idSensor};
    `;
    
    return await database.execute(instrucao);
}

async function cadastrar(identificacao, idBarril) {
    const instrucao = `
        INSERT INTO sensor (identificacao, id_barril) 
        VALUES ('${identificacao}', ${idBarril});
    `; 
    return await database.execute(instrucao);
}

async function atualizar(idSensor, identificacao, idBarril) {
    const instrucao = `
        UPDATE sensor 
        SET identificacao = '${identificacao}',
            id_barril = ${idBarril}
        WHERE id_sensor = ${idSensor};
    `;
    return await database.execute(instrucao);
}

async function deletar(idSensor) {
    const instrucao = `
        DELETE FROM sensor WHERE id_sensor = ${idSensor};
    `;
    
    return await database.execute(instrucao);
}

async function pesquisar(idEmpresa, pesquisa) {
    const instrucao = `
        SELECT 
            s.id_sensor AS idSensor,
            s.identificacao AS nomeSensor,
            s.id_barril AS idBarril,
            b.identificacao AS nomeBarril,
            c.identificacao AS nomeCave
        FROM sensor s
        JOIN barril b ON s.id_barril = b.id_barril
        JOIN cave c ON b.id_cave = c.id_cave
        WHERE c.id_empresa = ${idEmpresa} 
        AND (
            s.identificacao LIKE '%${pesquisa}%' 
            OR s.id_sensor LIKE '%${pesquisa}%'
            OR b.identificacao LIKE '%${pesquisa}%'
            OR c.identificacao LIKE '%${pesquisa}%'
        );
    `;
    return await database.execute(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    pesquisar,
    buscarPorId // Agora ela existe lá em cima!
}