var database = require("./../database/config");

function cadastrar(nome, sobrenome, email, senha) {
    let instrucaoSql = `
        INSERT INTO empresa (nome, sobrenome, email, senha)
            VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}')
    `;

    return database.execute(instrucaoSql);
}

module.exports = {
    cadastrar
}