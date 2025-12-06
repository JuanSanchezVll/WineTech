
document.getElementById('nome').value = sessionStorage.nomeMudar
document.getElementById('sobrenome').value = sessionStorage.sobrenomeMudar
document.getElementById('email').value = sessionStorage.emailMudar


function atualizar() {

    var nomeNovo = document.getElementById("nome").value;
    var sobrenomeNovo = document.getElementById("sobrenome").value;
    var emailNovo = document.getElementById("email").value;
    var senhaNova = document.getElementById("senha").value;

    fetch("painelAdministrativo/usuarios/atualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idFuncionario: sessionStorage.idFuncionarioMudar,
            nome: nomeNovo,
            sobrenome: sobrenomeNovo,
            email: emailNovo,
            senha: senhaNova
        })
    })
        .then(res => res.text())
        .then(txt => {
            console.log("Resposta crua:", txt);
            alert(txt);
        })

        .then(data => {
            console.log("Resposta:", data);
            alert("Usuário atualizado!");
            window.location = "index.html";
        })
        .catch(err => {
            console.error("Erro:", err);
            alert("Erro ao atualizar!");
        });
}

async function atualizar() {

    var nomeNovo = document.getElementById("nome").value;
    var sobrenomeNovo = document.getElementById("sobrenome").value;
    var emailNovo = document.getElementById("email").value;
    var senhaNova = document.getElementById("senha").value;

    try {
        const resposta = await fetch("/painelAdministrativo/atualizar", {
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
        });

        if (resposta.ok) {
            alert("Funcionario atualizado com sucesso!");
            window.location.href = "index.html";
        }
    } catch (erro) {
        console.error("Erro ao atualizar funcionario" + erro);
    }
}
