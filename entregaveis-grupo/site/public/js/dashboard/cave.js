
let chartTemperatura = null;
let chartUmidade = null;

    function mudarTexto() {
    const nomeUsuario = document.getElementById('profile-name')
    const html = sessionStorage.getItem('NICK_USUARIO');    
    nomeUsuario.innerHTML = html
}

mudarTexto()

async function carregarCaves() {
    const idEmpresa = sessionStorage.ID_EMPRESA;
    if (!idEmpresa) {
        console.error("sessionStorage.ID_EMPRESA indefinido");
        return;
    }

    try {
        const res = await fetch(`/dashboardCave/listarCaves/${idEmpresa}`);
        if (!res.ok) throw new Error("Erro ao buscar caves");
        const caves = await res.json();

        const select = document.getElementById("select-cave");
        select.innerHTML = "";

        if (!caves || caves.length === 0) {
            select.innerHTML = "<option value=''>Nenhuma cave encontrada</option>";
            return;
        }

        caves.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.id_cave;
            opt.textContent = c.identificacao;
            select.appendChild(opt);
        });

        select.addEventListener("change", onChangeCave);
        // selecionar primeira automaticamente
        select.selectedIndex = 0;
        onChangeCave();
    } catch (err) {
        console.error("carregarCaves erro:", err);
    }
}

async function onChangeCave() {
    const select = document.getElementById("select-cave");
    const idCave = select.value;
    if (!idCave) return;

    await Promise.all([
        carregarUltimasLeituras(idCave),
        carregarKpiUltimaLeitura(idCave),
        carregarKpis(idCave) // <-- FALTAVA ISSO
    ]);
}


async function carregarUltimasLeituras(idCave) {
    try {
        const res = await fetch(`/dashboardCave/ultimasLeituras/${idCave}`);
        if (!res.ok) throw new Error("Erro ao buscar ultimas leituras");
        const leituras = await res.json();

        const labels = leituras.map(l => l.barril);
        const temps = leituras.map(l => Number(l.temperatura));
        const umids = leituras.map(l => Number(l.umidade));

        atualizarGraficoTemperatura(labels, temps);
        atualizarGraficoUmidade(labels, umids);
    } catch (err) {
        console.error("carregarUltimasLeituras erro:", err);
    }
}

async function carregarKpiUltimaLeitura(idCave) {
    try {
        const res = await fetch(`/dashboardCave/kpi/ultima/${idCave}`);
        if (!res.ok) throw new Error("Erro ao buscar KPI");
        const kpi = await res.json();

        document.getElementById("kpiTemperatura").textContent =
            (kpi.temperatura !== null && kpi.temperatura !== undefined) ? Number(kpi.temperatura).toFixed(2) + " °C" : "--";
        document.getElementById("kpiUmidade").textContent =
            (kpi.umidade !== null && kpi.umidade !== undefined) ? Number(kpi.umidade).toFixed(2) + " %" : "--";
    } catch (err) {
        console.error("carregarKpiUltimaLeitura erro:", err);
    }
}

function atualizarGraficoTemperatura(labels, data) {
    const ctx = document.getElementById("chartTemperatura").getContext("2d");
    if (chartTemperatura) chartTemperatura.destroy();

    chartTemperatura = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Temperatura (°C)",
                data: data,
                borderWidth: 1,
                backgroundColor: 'rgba(214,166,92,0.95)',
                borderColor: 'rgba(214,166,92,1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: false } }
        }
    });
}

function atualizarGraficoUmidade(labels, data) {
    const ctx = document.getElementById("chartUmidade").getContext("2d");
    if (chartUmidade) chartUmidade.destroy();

    chartUmidade = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Umidade (%)",
                data: data,
                borderWidth: 1,
                backgroundColor: 'rgba(214,166,92,0.95)',
                borderColor: 'rgba(214,166,92,1)',
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: false } }
        }
    });
}

async function carregarKpis(idCave) {
    const result = await fetch(`/dashboardCave/kpis/${idCave}`);
    const kpis = await result.json();

    document.getElementById("kpiTemp").innerHTML = kpis.maiorTemperatura + "°C";
    document.getElementById("kpiUmid").innerHTML = kpis.maiorUmidade + "%";
}


window.addEventListener("load", () => {
    carregarCaves();
});
