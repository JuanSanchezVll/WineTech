function Cadastrar(nome, sobrenome, email, senha) {
    
    const dados = {
      nome:nome,
      sobrenome:sobrenome,
      email:email,
      senha:senha,
    };

    fetch("/painelAdministrativo/cadastrarUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    }) 

    .then (function (resposta) {
        if (!resposta.ok) {
        console.log("estou no then() ")
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