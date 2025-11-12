var database = require("./../database/config");

function cadastrar(cnpj, razaoSocial, nomeFantasia, emailContato, codigoSeguranca) {
    let instrucaoSql = `
        INSERT INTO empresa (cnpj, razao_social, nome_fantasia, email_contato, codigo_seguranca)
            VALUES ('${cnpj}', '${razaoSocial}', '${nomeFantasia}', '${emailContato}', '${codigoSeguranca}')
    `;

    return database.execute(instrucaoSql);
}

module.exports = {
    cadastrar
}