function mostrarErro(msg) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = msg;
    return false;
  }

function cadastrar(cnpj, razaoSocial, nomeFantasia, emailContato) {
    const cnpjValido = validarCNPJ(cnpj);
    const razaoSocialValida = validarRazaoSocial(razaoSocial);
    const nomeFantasiaValido = validarNomeFantasia(nomeFantasia);
    const emailContatoValido = validarEmail(emailContato);

    if (!cnpjValido || !razaoSocialValida || !nomeFantasiaValido || !emailContatoValido) {
        return mostrarErro("Formulário com erros, corrija antes de enviar.");
    }

    const dados = {
        cnpj: cnpj,
        razaoSocial: razaoSocial,
        nomeFantasia: nomeFantasia,
        emailContato: emailContato
    };

    fetch("/empresas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    }) 
    .then (function (resposta) {
        if (!resposta.ok) {
            throw "Erro ao cadastrar empresa.";
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