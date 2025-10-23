// --- Gráfico 15 dias (barra) ---
const ctx15 = document.getElementById('chart15dias').getContext('2d');

new Chart(ctx15, {
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
