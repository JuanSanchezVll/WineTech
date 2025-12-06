async function cadastrar(nome, sobrenome, email, senha) {
    try {

        const resultado = await fetch("/painelAdministrativo/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha,
                idEmpresa: sessionStorage.ID_EMPRESA,
                idNivelAcesso: 3
            })
        });

        if (!resultado.ok) {
            console.error("Erro: ", erro);
            alert("Ocorreu um erro ao cadastrar. Tente novamente.");
        }

        console.log("Cadastro realizado com sucesso!");
        window.location = "index.html";
    } catch (erro) {
        console.error("Erro: " + erro);
    }
}