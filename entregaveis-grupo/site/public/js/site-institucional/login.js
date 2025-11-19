

function autenticar() {
    emailVar = inputEmail.value
    senhaVar = inputSenha.value

    if (emailVar == "" || senhaVar == "") {
        alert(`Preencha todos os campos de Login`)
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (res) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (res.ok) {
            console.log(res);

            res.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.NICK_USUARIO = json.nome;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_NIVEL = json.nivel_acesso;
                sessionStorage.ID_FUNCIONARIO = json.id_funcionario;
                window.location = "../dashboard/index-dashboard.html";
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");
            res.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

