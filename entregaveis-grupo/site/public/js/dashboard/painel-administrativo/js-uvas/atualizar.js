let idUvaGlobal = null;

async function buscarUva() {
    try {
        const params = new URLSearchParams(window.location.search);
        idUvaGlobal = params.get('id'); 

        console.log("ID UVA: " + idUvaGlobal);

        const resposta = await fetch(`/uvas/listar?idEmpresa=${sessionStorage.ID_EMPRESA}&idUva=${idUvaGlobal}`);
        const uva = await resposta.json();

        console.log(uva);

        const nome = document.getElementById("nome");
        const temperaturaMinima = document.getElementById("temperaturaMinima");
        const temperaturaMaxima = document.getElementById("temperaturaMaxima");
        const umidadeMinima = document.getElementById("umidadeMinima");
        const umidadeMaxima = document.getElementById("umidadeMaxima");

        nome.value = uva[0].nome;
        temperaturaMinima.value = uva[0].temperatura_minima;
        temperaturaMaxima.value = uva[0].temperatura_maxima;
        umidadeMinima.value = uva[0].umidade_minima;
        umidadeMaxima.value = uva[0].umidade_maxima;
    } catch (erro) {
        console.error("Erro ao cadastrar uva" + erro);
    }
}

async function atualizar(nome, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima) {
    try {
        const resposta = await fetch("/uvas/atualizar", {
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
                idUva: idUvaGlobal
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