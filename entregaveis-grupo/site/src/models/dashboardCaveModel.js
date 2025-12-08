const database = require("../database/config");

function listarInfos(idEmpresa) {
    const instrucao = `
        SELECT *
        FROM vw_infos
        WHERE id_empresa = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listarInfos
};
