var empresaModel = require("./../models/empresaModel");

function cadastrar(req, res) {
    const { cnpj, razaoSocial, nomeFantasia, emailContato } = req.body;

    let codigoSeguranca = gerarCodigoSeguranca();

    empresaModel.cadastrar(cnpj, razaoSocial, nomeFantasia, emailContato, codigoSeguranca)
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

function gerarCodigoSeguranca() {
    return cod = (Math.random() * 1000000).toFixed(0)
}

module.exports = {
    cadastrar
}