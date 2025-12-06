var database = require("../database/config");

function cadastrar(nome, sobrenome, email, senha, idEmpresa, idNivelAcesso) {
    if (idNivelAcesso != 2 && idNivelAcesso != 3) {
        throw "ID_NIVEL_ACESSO_INVALIDO";
    }

    const instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, id_empresa, id_nivel_acesso)
            VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${idEmpresa}', '${idNivelAcesso}')
    `;

    return database.execute(instrucaoSql);
}

function atualizarFuncionario(nome, sobrenome, email, senha, idFuncionario) {
    if (nome == "" || sobrenome == "" || email == "" || senha == "") {
        throw "DADOS_NAO_PREENCHIDOS";
    }else{

    const instrucaoSql = `
        UPDATE usuario SET nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}', senha= '${senha}' WHERE
            id_funcionario = ${idFuncionario}        
    `;
    console.log(instrucaoSql);


    return database.execute(instrucaoSql);
}
}


module.exports = {
    cadastrar,
    atualizarFuncionario
}