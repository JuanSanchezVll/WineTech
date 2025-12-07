async function cadastrar(identificacao, idCave, idUva) {
    try {
        const resposta = await fetch("/barris/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identificacao: identificacao,
                idCave: idCave,
                idUva: idUva
            })
        });

        if (resposta.ok) {
            alert("Barril cadastrado com sucesso");
            window.location.href="index.html";
        }
    } catch (erro) {
        console.error("Erro ao cadastrar uva" + erro);
    }
}

async function carregarCaves() {
    const resultado = await fetch(`/caves/listar?idEmpresa=${sessionStorage.ID_EMPRESA}`);
    const caves = await resultado.json();
    const selectCave = document.getElementById("caveAssociada");

    selectCave.innerHTML = `<option value="#" disabled>Selecione...</option>`;

    for (let i = 0; i < caves.length; i++) {
        selectCave.innerHTML += `<option value="${caves[i].id}">${caves[i].identificacao}</option>`;
    }
}

async function carregarUvas() {
    const resultado = await fetch(`/uvas/listar?idEmpresa=${sessionStorage.ID_EMPRESA}`);
    const uvas = await resultado.json();
    const selectUva = document.getElementById("uvaArmazenada");

    selectUva.innerHTML = `<option value="#" disabled>Selecione...</option>`;

    for (let i = 0; i < uvas.length; i++) {
        console.log("Uva");
        console.log(uvas[i].nome);
        selectUva.innerHTML += `<option value="${uvas[i].id_uva}">${uvas[i].nome}</option>`;
    }
}
