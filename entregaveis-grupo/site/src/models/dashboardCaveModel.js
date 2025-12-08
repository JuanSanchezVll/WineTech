const database = require("../database/config.js");

function listarInfos(idEmpresa) {
    const instrucao = `
        SELECT *
        FROM vw_infos
        WHERE id_empresa = ${idEmpresa};
    `;
    return database.execute(instrucao);
}

module.exports = {
    listarInfos
};
