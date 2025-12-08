async function plotarKPIs() {
    await plotarSensoresAtivos();
    await plotarQuantidadeAlertasNoMes();
}

async function plotarSensoresAtivos() {
    const kpi = document.getElementById("kpi-sensores-ativos");

    const resultado = await fetch(`/sensores/listar/ativos?idEmpresa=${sessionStorage.ID_EMPRESA}`);
    const valor = await resultado.json();

    console.log(valor);

    kpi.innerHTML = `${valor[0].ativos} / ${valor[0].total}`;
}

async function plotarQuantidadeAlertasNoMes() {
    const kpi = document.getElementById("kpi-qtd-alertas-mes");
    
    const resultado = await fetch(`/dashboardIndex/totalAlertasMensal/empresa/${sessionStorage.ID_EMPRESA}`);
    const valor = await resultado.json();

    kpi.innerHTML = valor[0].total_alertas;
}

async function plotarGraficoAlertas() {
    const ctx = document.getElementById('chartCavesAlerts');

    const resultado = await fetch(`/dashboardIndex/graficos/alertas/empresa/${sessionStorage.ID_EMPRESA}`);
    const dados = await resultado.json();
    let alertas = [];
    let caves = [];

    console.log(dados);

    for (let i = 0; i < dados.length; i++) {
        caves.push(dados[i].identificacao);
        alertas.push(dados[i].alertas);
    }

    console.log(caves)
    console.log(alertas)

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: caves,

            datasets: [{
                label: 'Alertas',
                data: alertas,

                backgroundColor: 'rgba(214,166,92,0.95)',
                borderColor: 'rgba(214,166,92,1)',
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function listarCaves() {
    const selectCave = document.getElementById("select-cave");
    const resultado = await fetch(`/caves/listar?idEmpresa=${sessionStorage.ID_EMPRESA}`); 
    const caves = await resultado.json();    

    for (let i = 0; i < caves.length; i++) {
        const op = document.createElement("option");
        op.value = caves[i].id;
        op.textContent = caves[i].identificacao;
        selectCave.appendChild(op);
    }

    if (caves.length > 0) {
        listarBarris(caves[0].id);
    }
}

async function listarBarris(idCave) {
    const selectBarril = document.getElementById("select-barril");
    const selectCave = document.getElementById("select-cave");

    if (!idCave) {
        idCave = selectCave.value;
    }

    if (!idCave) {
        return;
    };

    selectBarril.innerHTML = "";
    
    const resultado = await fetch(`/barris/listar?idEmpresa=${sessionStorage.ID_EMPRESA}&idCave=${idCave}`); 
    const barris = await resultado.json();

    console.log("BARRIS: ");
    console.log(barris);

    for (let i = 0; i < barris.length; i++) {
        const op = document.createElement("option");
        op.value = barris[i].id_barril;
        op.textContent = barris[i].identificacao;
        selectBarril.appendChild(op);
    }

    if (barris.length > 0) {
        await carregarUltimaLeitura();
    } else {
        document.getElementById("barril-temp").textContent = "-- °C";
        document.getElementById("barril-umi").textContent = "-- %";
    }
}

async function carregarUltimaLeitura() {
    const idEmpresa = sessionStorage.ID_EMPRESA;
    const idCave = document.getElementById("select-cave").value;
    const idBarril = document.getElementById("select-barril").value;

    console.log("IDS:", { idEmpresa, idCave, idBarril });

    if (!idEmpresa || !idCave || !idBarril) {
        return;
    }

    const resultado = await fetch(`/dashboardIndex/ultimaLeitura/empresa/${idEmpresa}/caves/${idCave}/barris/${idBarril}`);
    const dados = await resultado.json();

    if (dados.length > 0) {
        document.getElementById("barril-temp").textContent = `${dados[0].temperatura} °C`;
        document.getElementById("barril-umi").textContent = `${dados[0].umidade} %`;
    } else {
        document.getElementById("barril-temp").textContent = "-- °C";
        document.getElementById("barril-umi").textContent = "-- %";
    }
}