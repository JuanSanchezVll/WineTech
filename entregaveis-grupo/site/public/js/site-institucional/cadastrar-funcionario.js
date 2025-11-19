function cadastrar(nome, sobrenome, email, senha, codigoSeguranca) {
    const nomeValido = validarNome(nome);
    const sobrenomeValido = validarSobrenome(sobrenome);
    const emailValido = validarEmail(email);
    const senhaValida = validarSenha(senha);

    if (!nomeValido || !sobrenomeValido || !emailValido || !senhaValida) {
        alert("Formulário com erros, corrija antes de enviar.");
        return;
    }

    const dados = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
        codigoSeguranca: codigoSeguranca
    };

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    }) 
    .then (function (resposta) {
        if (!resposta.ok) {
            throw "Erro ao cadastrar funcionário.";
        }

        resposta.json().then(json => {
            alert("Cadastro realizado com sucesso!");
        })
    })
    .catch (function (erro) {
        console.error("Erro: ", erro);
        alert("Ocorreu um erro ao cadastrar. Tente novamente.");
    });
}