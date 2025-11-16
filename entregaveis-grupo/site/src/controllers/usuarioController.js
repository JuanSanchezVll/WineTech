var usuarioModel = require("./../models/usuarioModel");

function cadastrarComCodigo(req, res) {
    const { nome, sobrenome, email, senha, codigoSeguranca } = req.body;

    usuarioModel.cadastrarComCodigo(nome, sobrenome, email, senha, codigoSeguranca)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro
                );

                res.status(500).json(erro);
            }
        );
}

function cadastrarSemCodigo(req, res) {
    const { nome, sobrenome, email, senha, idEmpresa, idNivelAcesso } = req.body;

    usuarioModel.cadastrarSemCodigo(nome, sobrenome, email, senha, idEmpresa, idNivelAcesso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro
                );
                
                if (erro == "ID_NIVEL_ACESSO_INVALIDO") {
                    res.json(400).json(erro);
                } else {
                    res.status(500).json(erro);
                }
            }
        )

}

module.exports = {
    cadastrarSemCodigo,
    cadastrarComCodigo
}