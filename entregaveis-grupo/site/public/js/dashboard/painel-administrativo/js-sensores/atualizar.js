let idSensorGlobal = null;

async function carregarSensor() {
    const params = new URLSearchParams(window.location.search);
    idSensorGlobal = params.get('id');

    const resposta = await fetch(`/sensores/listar?idSensor=${idSensorGlobal}`);
    const sensor = await resposta.json();
    const barris = await carregarBarris();
    const selectBarril = document.getElementById("select_barril");
    const identificacaoSensor = document.getElementById("identificacao");
    identificacaoSensor.value = sensor[0].identificacao;
    console.log(barris);
    console.log(sensor);

    selectBarril.innerHTML = `<option value="#" disabled>Selecione...</option>`;

    for (let i = 0; i < barris.length; i++) {
        if (barris[i].id == sensor[0].idBarril) {
            selectBarril.innerHTML += `<option value="${sensor[0].idBarril}" selected>${barris[i].identificacao}</option>`;
        } else {
            selectBarril.innerHTML += `<option value="${sensor[0].idBarril}">${barris[i].identificacao}</option>`;
        }
    }
}

async function carregarBarris() {
    const resposta = await fetch(`/barris/listar?idEmpresa=${sessionStorage.ID_EMPRESA}`);
    return await resposta.json();
}

async function atualizar() {
    try {
        const resposta = await fetch("/sensores/atualizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identificacao: identificacao.value,
                idBarril: select_barril.value,
                idSensor: idSensorGlobal
            })
        });

        if (resposta.ok) {
            alert("Sensor atualizado com sucesso");
            window.location.href="index.html";
        }
    } catch (erro) {
        console.error("Erro ao atualizar sensor" + erro);
    }
}