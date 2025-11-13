var empresaModel = require("./../models/usuarioModel");


function cadastrar(req, res) {
    const { nome,sobrenome, email, senha } = req.body;

    usuarioModel.cadastrar(nome, sobrenome, email, senha)
        .then(
            function (resultado) {
                console.log('foi bb')
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