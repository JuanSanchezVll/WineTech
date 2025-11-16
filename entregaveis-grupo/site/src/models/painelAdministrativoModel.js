var database = require("../database/config");

function cadastrarUsuario(nome, sobrenome, email, senha, idEmpresa, idNivelAcesso) {
    if (idNivelAcesso != 2 && idNivelAcesso != 3) {
        throw "ID_NIVEL_ACESSO_INVALIDO";
    }

    const instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, id_empresa, id_nivel_acesso)
            VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${idEmpresa}', '${idNivelAcesso}')
    `;

    return database.execute(instrucaoSql);
}

module.exports = {
    cadastrarUsuario
}