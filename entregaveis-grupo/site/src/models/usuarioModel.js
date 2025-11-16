var database = require("./../database/config");

function cadastrar(nome, sobrenome, email, senha, idEmpresa, idNivelAcesso) {
    if (!idNivelAcesso) {
        idNivelAcesso = 3;
    }

    const instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, id_empresa, id_nivel_acesso)
            VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${idEmpresa}', '${idNivelAcesso}')
    `;

    return database.execute(instrucaoSql);
}

module.exports = {
    cadastrar
}