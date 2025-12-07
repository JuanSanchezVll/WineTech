const temperaturaData = {
    labels: ["Barril 1", "Barril 2", "Barril 3", "Barril 4", "Barril 5", "Barril 6"],
    datasets: [{
        label: 'Temperatura (°C)',
        data: [24, 25, 26, 27, 23, 25],
        backgroundColor: 'rgba(214,166,92,0.95)',
        borderRadius: 6,
    }]
};

const umidadeData = {
    labels: ["Barril 1", "Barril 2", "Barril 3", "Barril 4", "Barril 5", "Barril 6"],
    datasets: [{
        label: 'Umidade (%)',
        data: [80, 85, 88, 82, 79, 84],
        borderColor: 'rgba(139, 108, 61, 0.95)',
        backgroundColor: 'rgba(214,166,92,0.95)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
    }]
};



const temperaturaConfig = {
    type: 'bar',
    data: temperaturaData,
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 40,
                ticks: { stepSize: 5 }
            }
        }
    }
};

const umidadeConfig = {
    type: 'line',
    data: umidadeData,
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: { stepSize: 10 }
            }
        }
    }
};


const ctxTemp = document.getElementById('chartTemperatura').getContext('2d');
const chartTemperatura = new Chart(ctxTemp, temperaturaConfig);

const ctxUmid = document.getElementById('chartUmidade').getContext('2d');
const chartUmidade = new Chart(ctxUmid, umidadeConfig);



