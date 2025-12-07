let idBarrilGlobal = null;

async function carregarBarril() {
    try {
        const params = new URLSearchParams(window.location.search);
        idBarrilGlobal = params.get('id'); 

        const resposta = await fetch(`/barris/listar?idEmpresa=${sessionStorage.ID_EMPRESA}&idBarril=${idBarrilGlobal}`);
        const barril = await resposta.json();
        const caves = await listarCaves();
        const uvas = await listarUvas();
        const selectCave = document.getElementById("caveAssociada");
        const selectUva = document.getElementById("uvaArmazenada");

        console.log("Caves adshjklfaslk");
        console.log(caves);

        selectCave.innerHTML = `<option value="#">Selecione...</option>`;
        selectUva.innerHTML = `<option value="#">Selecione...</option>`;
        
        console.log("Antes " + caves.length);

        for (let i = 0; i < caves.length; i++) {
            if (caves[i].identificacao === barril[0].cave_associada) {
                console.log("Cave");
                console.log(caves[i]);
                selectCave.innerHTML += `<option value="${caves[i].id}" selected>${caves[i].identificacao}</option>`;
            } else {
                console.log("Cave A");
                console.log(caves[i]);
                selectCave.innerHTML += `<option value="${caves[i].id}">${caves[i].identificacao}</option>`;
            }
            console.log("DEPOIS " + caves.length);
        }

        for (let i = 0; i < uvas.length; i++) {
            if (uvas[i].nome === barril[0].uva_armazenada) {
                selectUva.innerHTML += `<option value="${uvas[i].id_uva}" selected>${uvas[i].nome}</option>`;
            } else {
                selectUva.innerHTML += `<option value="${uvas[i].id_uva}">${uvas[i].nome}</option>`;
            }
        }

        const identificacao = document.getElementById("identificacao");
        identificacao.value = barril[0].identificacao;
    } catch (erro) {
        console.error("Erro ao carregar barril" + erro);
    }
}

async function listarCaves() {
    const resultado = await fetch(`/caves/listar?idEmpresa=${sessionStorage.ID_EMPRESA}`);
    return await resultado.json();
}

async function listarUvas() {
    const resultado = await fetch(`/uvas/listar?idEmpresa=${sessionStorage.ID_EMPRESA}`);
    return await resultado.json();
}

async function atualizar(nome, identificacao, caveAssociada, uvaArmazenada) {
    try {
        const resposta = await fetch("/barris/atualizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                identificacao: identificacao,
                caveAssociada: caveAssociada,
                uvaArmazenada: uvaArmazenada
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
