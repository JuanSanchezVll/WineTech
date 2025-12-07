const ctx = document.getElementById('chartBarril').getContext('2d');

const horas = [
    '00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h',
    '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'
];

const temperatura = [
    18.0, 18.1, 18.0, 17.9, 18.0, 18.2, 18.4, 18.5, 18.3, 18.5, 18.6, 18.7,
    18.8, 18.9, 19.0, 19.1, 19.0, 18.8, 18.7, 18.6, 18.5, 18.4, 18.3, 18.2
];

const umidade = [
    64, 64, 65, 64, 65, 65, 66, 66, 65, 65, 66, 66,
    67, 67, 66, 66, 65, 65, 64, 64, 65, 65, 64, 64
];

const barrilChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: horas,
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: temperatura,
                borderColor: '#fff700ff',
                backgroundColor: 'rgba(239, 194, 32, 0.41)',
                tension: 0.3,
                fill: true,
                yAxisID: 'y'
            },
            {
                label: 'Umidade (%)',
                data: umidade,
                borderColor: '#f97407ff',
                backgroundColor: 'rgba(240, 178, 42, 0.2)',
                tension: 0.3,
                fill: true,
                yAxisID: 'y1'
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { family: 'Poppins', size: 14 }
                }
            },
            title: {
                display: true,
                text: 'Monitoramento do Barril - últimas 24h',
                font: { size: 18, family: 'Poppins', weight: '600' },
                color: '#4b0e1a'
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x: {
                ticks: { color: '#4b0e1a' }
            },
            y: {
                type: 'linear',
                position: 'left',
                ticks: { color: '#e14b4b' },
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
                    color: '#e14b4b',
                    font: { weight: '600' }
                }
            },
            y1: {
                type: 'linear',
                position: 'right',
                ticks: { color: '#f0b22a' },
                beginAtZero: true,
                grid: { drawOnChartArea: false },
                title: {
                    display: true,
                    text: 'Umidade (%)',
                    color: '#f0b22a',
                    font: { weight: '600' }
                }
            }
        }
    }
});
