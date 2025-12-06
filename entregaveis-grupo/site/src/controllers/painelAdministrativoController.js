var painelAdministrativoModel = require("./../models/painelAdministrativoModel");

// async function atualizarUsuario(req, res) {   

//     const {nome, sobrenome, email, senha, idFuncionario} = req.body
    
//     painelAdministrativoModel.atualizarUsuario(nome, sobrenome, email, senha, idFuncionario).then(
//             function (resultado) {
//                 console.log('to aqui');                
//                 res.json(resultado);
//             }
//         ).catch( // Este bloco agora lida com erros
//             function (erro) {
//                 console.error("Erro no controller ao atualizar usuário:", erro);
//                 // Envia uma resposta de erro 500 para o frontend
//                 res.status(500).json({ error: "Erro interno do servidor ao atualizar usuário." });
//             }
//         );

// }

async function atualizarFuncionario(req, res) {
    try {
        const { 
                nome, 
                sobrenome, 
                email, 
                senha, 
                idFuncionario 
        } = req.body;

        const resultado = await painelAdministrativoModel.atualizarFuncionario(nome, sobrenome, email, senha, idFuncionario);

        return res.status(200).json(resultado);
    } catch(err) {
        console.error("Erro ao atualizar funcionario: " + err);
        return res.status(500).json({ mensagem: "Erro interno no servidor", erro: err});
    }
}

async function cadastrar(req, res) {
    try {
        const { nome, sobrenome, email, senha, idEmpresa, idNivelAcesso } = req.body;
        
        const resultado = await painelAdministrativoModel.cadastrar(nome, sobrenome, email, senha, idEmpresa, idNivelAcesso);

        return res.status(200).json(resultado);
    } catch (erro) {
        console.error(erro);
    }
}

module.exports = {
    cadastrar,
    atualizarFuncionario
}