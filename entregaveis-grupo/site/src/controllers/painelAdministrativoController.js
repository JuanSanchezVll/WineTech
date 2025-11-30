var painelAdministrativoModel = require("./../models/painelAdministrativoModel");

function atualizarUsuario(req, res) {   
    
    painelAdministrativoModel.atualizarUsuario(nome, sobrenome, email, senha, idFuncionario).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch( )

}

    fetch("/painelAdministrativo/usuarios/atualizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idFuncionario: sessionStorage.idFuncionarioMudar,
                nome: nomeNovo,
                sobrenome: sobrenomeNovo,
                email: emailNovo,
                senha: senhaNova

            }).then(res => res.json())

        }).catch(err => console.log("Erro no UPDATE:", err));

function cadastrarUsuario(req, res) {
    idEmpresa = 1;
    idNivelAcesso = 2;

    const { nome, sobrenome, email, senha, idEmpresa, idNivelAcesso } = req.body;

    painelAdministrativoModel.cadastrarUsuario(nome, sobrenome, email, senha, idEmpresa, idNivelAcesso)
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
    cadastrarUsuario,
    atualizarUsuario
}