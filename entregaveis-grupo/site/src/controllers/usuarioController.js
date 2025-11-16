var usuarioModel = require("./../models/usuarioModel");

function cadastrar(req, res) {
    const { nome, sobrenome, email, senha, codigoSeguranca } = req.body;

    console.log("oi");

    usuarioModel.cadastrar(nome, sobrenome, email, senha, codigoSeguranca)
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