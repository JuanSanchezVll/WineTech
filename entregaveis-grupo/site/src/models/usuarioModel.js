var database = require("../database/config");

async function cadastrar(nome, sobrenome, email, senha ,idEmpresa) {
    const idNivelAcesso = 3;

    const instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, id_empresa, id_nivel_acesso)
            VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${idEmpresa}', '${idNivelAcesso}')
    `;

    return database.execute(instrucaoSql);
}

async function validarCodigoSeguranca(codigo) {
    const instrucaoSql = `
        SELECT id_empresa FROM empresa WHERE codigo_seguranca = '${codigo}'
    `;

    const resultado = await database.execute(instrucaoSql);

    return resultado;
}

async function autenticar(email, senha) 
{
    const instrucaoSql = `
        SELECT id_usuario, nome, sobrenome, email, senha, id_nivel_acesso, id_empresa FROM usuario WHERE email = '${email}' AND senha = '${senha}'
    `;

     const resultado = await database.execute(instrucaoSql);

    console.log(resultado);

     return resultado;
    
}

async function listar(idEmpresa) {
    const instrucaoSql = `
        SELECT 
            id_usuario, 
            nome, 
            sobrenome, 
            email, 
            id_empresa,
            id_nivel_acesso,
            senha
        FROM usuario
        WHERE id_empresa = ${idEmpresa};
    `;

    return await database.execute(instrucaoSql);
}

async function buscarPorId(idEmpresa, idUsuario) {
    const instrucaoSql = `
        SELECT 
            id_usuario, 
            nome, 
            sobrenome, 
            email, 
            id_empresa,
            id_nivel_acesso,
            senha
        FROM usuario
        WHERE 
            id_empresa = ${idEmpresa}
            AND id_usuario = ${idUsuario};
    `;

    return await database.execute(instrucaoSql);
}

module.exports = {
    cadastrar,
    autenticar,
    listar,
    validarCodigoSeguranca,
    buscarPorId
}