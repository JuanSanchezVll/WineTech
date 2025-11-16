var usuarioModel = require("./../models/usuarioModel");

function cadastrar(req, res) {
    const { nome,sobrenome, email, senha, idEmpresa } = req.body;

    usuarioModel.cadastrar(nome, sobrenome, email, senha, idEmpresa)
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

module.exports = {
    cadastrar
}