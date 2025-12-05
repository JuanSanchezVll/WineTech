async function cadastrar(nome, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima) {
    try {
        const resposta = await fetch("/uvas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                temperaturaMinima: temperaturaMinima,
                temperaturaMaxima: temperaturaMaxima,
                umidadeMinima: umidadeMinima,
                umidadeMaxima: umidadeMaxima,
                idEmpresa: sessionStorage.ID_EMPRESA
            })
        });

        if (resposta.ok) {
            alert("Uva cadastrada com sucesso");
            window.location.href="index.html";
        }
    } catch (erro) {
        console.error("Erro ao cadastrar uva" + erro);
    }
}