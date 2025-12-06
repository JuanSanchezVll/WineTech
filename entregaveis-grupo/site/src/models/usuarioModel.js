var database = require("../database/config");

async function cadastrar(nome, sobrenome, email, senha, codigoSeguranca) {
    const idNivelAcesso = 3;
    const resultado = await validarCodigoSeguranca(codigoSeguranca);
    const idEmpresa = resultado[0].id_empresa;

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
        SELECT id_usuario, nome, sobrenome, email, senha, nivel_acesso, id_empresa FROM usuario WHERE email = '${email}' AND senha = '${senha}'
    `;

     const resultado = await database.execute(instrucaoSql);

    console.log(resultado);

     return resultado;
    
}

async function listar() {
    const instrucaoSql = `
        SELECT 
            id_usuario, 
            nome, 
            sobrenome, 
            email, 
            id_empresa,
            id_nivel_acesso
        FROM usuario;
    `;

    return database.execute(instrucaoSql);
}

module.exports = {
    cadastrar,
    autenticar,
    listar
}