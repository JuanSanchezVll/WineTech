var database = require("../database/config");

async function cadastrar(nome, sobrenome, email, senha, idEmpresa, idNivelAcesso) {
    
    const instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, id_empresa, id_nivel_acesso)
        VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', ${idEmpresa}, ${idNivelAcesso});
    `;

    return database.execute(instrucaoSql);
}

async function listar(idEmpresa) {
    const instrucaoSql = `
        SELECT 
            u.id_usuario, 
            u.nome, 
            u.sobrenome, 
            u.email,
            u.id_nivel_acesso, -- PRECISAR TRAZER ISSO AGORA para o <select> saber qual selecionar
            n.nome AS nomeNivel
        FROM usuario u
        JOIN nivel_acesso n ON u.id_nivel_acesso = n.id_nivel_acesso
        WHERE u.id_empresa = ${idEmpresa};
    `;
    return await database.execute(instrucaoSql);
}

async function atualizar(idFuncionario, nome, sobrenome, email, senha, idNivelAcesso) {
    const instrucaoSql = `
        UPDATE usuario 
        SET nome = '${nome}', 
            sobrenome = '${sobrenome}', 
            email = '${email}',
            senha = '${senha}',
            id_nivel_acesso = ${idNivelAcesso}
        WHERE id_usuario = ${idFuncionario};
    `;
    return await database.execute(instrucaoSql);
}

async function deletar(idFuncionario) {
    const instrucaoSql = `
        DELETE FROM usuario WHERE id_usuario = ${idFuncionario};
    `;
    return await database.execute(instrucaoSql);
}

async function pesquisar(idEmpresa, pesquisa) {
    const instrucaoSql = `
        SELECT 
            u.id_usuario, 
            u.nome, 
            u.sobrenome, 
            u.email,
            n.nome AS nomeNivel
        FROM usuario u
        JOIN nivel_acesso n ON u.id_nivel_acesso = n.id_nivel_acesso
        WHERE u.id_empresa = ${idEmpresa} 
        AND (
            u.id_usuario LIKE '%${pesquisa}%'
            OR u.nome LIKE '%${pesquisa}%' 
            OR u.sobrenome LIKE '%${pesquisa}%'
            OR u.email LIKE '%${pesquisa}%'
            OR n.nome LIKE '%${pesquisa}%'
        );
    `;
    return await database.execute(instrucaoSql);
}

module.exports = {
    cadastrar,
    atualizar,
    listar,
    deletar,
    pesquisar
};
