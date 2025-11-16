var database = require("../database/config");

async function cadastrarComCodigo(nome, sobrenome, email, senha, codigoSeguranca) {
    const idNivelAcesso = 3;
    const resultado = await validarCodigoSeguranca(codigoSeguranca);
    const idEmpresa = resultado[0].id_empresa;

    const instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, id_empresa, id_nivel_acesso)
            VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${idEmpresa}', '${idNivelAcesso}')
    `;

    return database.execute(instrucaoSql);
}

function cadastrarSemCodigo(nome, sobrenome, email, senha, idEmpresa, idNivelAcesso) {
    console.log(idNivelAcesso);
    

    if (idNivelAcesso != 2 && idNivelAcesso != 3) {
        console.log(idNivelAcesso);
        throw "ID_NIVEL_ACESSO_INVALIDO";
    }

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

module.exports = {
    cadastrarComCodigo,
    cadastrarSemCodigo
}