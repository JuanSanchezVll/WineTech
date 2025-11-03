const tooltipBarris = document.getElementById('tooltip-info');
const tooltipTitleBarris = document.getElementById('tooltip-title');
const tooltipDescBarris = document.getElementById('tooltip-desc');
const btnVerBarris = document.getElementById('btn-ver');
const btnCloseBarris = document.getElementById('btn-close-tooltip');

const barrilButtons = document.querySelectorAll('.barril-card .btn-primary');

function abrirTooltipBarris(titulo, descricao, status) {
    if (localStorage.getItem('tooltipClosed')) return;

    tooltipTitleBarris.textContent = titulo;
    tooltipDescBarris.textContent = descricao;
    tooltipBarris.querySelector('.tooltip-content').style.borderTop = `6px solid ${statusColorBarris(status)}`;
    tooltipBarris.style.display = 'flex';
}

function statusColorBarris(status) {
    switch (status) {
        case 'normal': return '#27ae60';
        case 'atencao': return '#f39c12';
        case 'alerta': return '#c0392b';
        default: return '#4b0e1a';
    }
}

barrilButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const barrilCard = btn.closest('.barril-card');
        const temp = barrilCard.querySelector('p:nth-child(2) strong').textContent;
        const umid = barrilCard.querySelector('p:nth-child(3) strong').textContent;
        const titulo = barrilCard.querySelector('h4').textContent;

        let status = 'normal';
        if (barrilCard.classList.contains('alerta')) status = 'alerta';
        if (barrilCard.classList.contains('atencao')) status = 'atencao';

        const descricao = `Temperatura: ${temp}\nUmidade: ${umid}`;
        abrirTooltipBarris(titulo, descricao, status);
    });
});

btnVerBarris.addEventListener('click', () => {
    tooltipBarris.style.display = 'none';
});

btnCloseBarris.addEventListener('click', () => {
    tooltipBarris.style.display = 'none';
    localStorage.setItem('tooltipClosed', 'true');
});

tooltipBarris.addEventListener('click', (e) => {
    if (e.target === tooltipBarris) tooltipBarris.style.display = 'none';
});


// KPIs

const tooltipKPIs = document.getElementById('tooltip-info');
const titleKPIs = document.getElementById('tooltip-title');
const descKPIs = document.getElementById('tooltip-desc');
const btnVerKPIs = document.getElementById('btn-ver');

document.querySelectorAll('.info-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const type = icon.getAttribute('data-tooltip');
        if (type === 'temp') {
            titleKPIs.textContent = 'Temperatura mais alta';
            descKPIs.innerHTML = 'Barril #1<br>Temperatura: 25°C<br>Umidade: 70%';
        } else {
            titleKPIs.textContent = 'Umidade mais alta';
            descKPIs.innerHTML = 'Barril #2<br>Temperatura: 15°C<br>Umidade: 85%';
        }
        tooltipKPIs.style.display = 'flex';
    });
});

btnVerKPIs.addEventListener('click', () => {
    window.location.href = 'barril.html';
});

document.addEventListener('click', (e) => {
    if (!tooltipKPIs.contains(e.target) && !e.target.classList.contains('info-icon')) {
        tooltipKPIs.style.display = 'none';
    }
});


// Gráficos Chart.js

const ctx15Barras = document.getElementById('chart15dias').getContext('2d');

new Chart(ctx15Barras, {
    type: 'bar',
    data: {
        labels: Array.from({ length: 15 }, (_, i) => 'Dia ' + (i + 1)),
        datasets: [{
            label: 'Quantidade de Alertas',
            data: [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
            backgroundColor: 'rgba(214,166,92,0.95)',
            borderColor: 'rgba(214,166,92,1)',
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
        },
        layout: { padding: { top: 6, bottom: 6 } },
        scales: {
            x: { grid: { display: false }, ticks: { maxRotation: 0, minRotation: 0 } },
            y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
    }
});

const ctx15diasLine = document.getElementById('chart15dias').getContext('2d');
const chart15diasLine = new Chart(ctx15diasLine, {

    type: 'line',
    data: {
        labels: ['25/10', '26/10', '27/10', '28/10', '29/10', '30/10', '31/10'],
        datasets: [{
            label: 'Alertas',
            data: [1, 0, 2, 1, 0, 0, 1],
            borderColor: '#c0392b',
            backgroundColor: 'rgba(192, 57, 43, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
    }
});