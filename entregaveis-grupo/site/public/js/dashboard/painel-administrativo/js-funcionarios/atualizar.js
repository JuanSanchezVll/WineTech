
    document.getElementById('nome').value = sessionStorage.nomeMudar
    document.getElementById('sobrenome').value = sessionStorage.sobrenomeMudar
    document.getElementById('email').value = sessionStorage.emailMudar

    var nomeNovo = nome.value
    var sobrenomeNovo = sobrenome.value
    var emailNovo = email.value
    var senhaNova = senha.value

    function atualizar() {
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
             })
         }).catch(err => console.log("Erro no UPDATE:", err));
    }

     