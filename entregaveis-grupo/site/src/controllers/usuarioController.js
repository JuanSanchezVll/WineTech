var usuarioModel = require("./../models/usuarioModel");

async function listar(req, res) {
    try {
        const { idEmpresa, idUsuario } = req.query;

        if (idEmpresa && idUsuario) {
            console.log("Listando usuarios da empresa por idUsuario");
            const resultado = await usuarioModel.buscarPorId(idEmpresa, idUsuario);
            return res.status(200).json(resultado);
        }

        console.log("Listando usuarios da empresa");

        const resultado = await usuarioModel.listar(idEmpresa);
        return res.status(200).json(resultado);
    } catch(err) {
        console.error("Erro ao listar usuarios" + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err})
    }
}

function cadastrar(req, res) {
    const { nome, sobrenome, email, senha, codigoSeguranca } = req.body;

    usuarioModel.cadastrar(nome, sobrenome, email, senha, codigoSeguranca)
        .then(
            function (resultado) {
                console.log("Res: " + resultado);
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

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id_usuario: resultadoAutenticar[0].id_funcionario,
                        nome: resultadoAutenticar[0].nome,
                        sobrenome: resultadoAutenticar[0].sobrenome,
                        email: resultadoAutenticar[0].email,
                        nivel_acesso: resultadoAutenticar[0].id_nivel_acesso,
                        senha: resultadoAutenticar[0].senha,
                        id_empresa: resultadoAutenticar[0].id_empresa
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo email e senha!");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }

}



module.exports = {
    cadastrar,
    autenticar,
    listar
}
