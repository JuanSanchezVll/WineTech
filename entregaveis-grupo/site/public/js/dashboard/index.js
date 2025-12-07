const ctx = document.getElementById('chartCavesAlerts');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'Cave 1', 'Cave 2', 'Cave 3', 'Cave 4', 'Cave 5',
            'Cave 6', 'Cave 7', 'Cave 8', 'Cave 9', 'Cave 10'
        ],

        datasets: [{
            label: 'Alertas',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 7, 3, 7, 6, 5],

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



const selectCave = document.getElementById("select-cave");
const selectBarril = document.getElementById("select-barril");

const caves = ["Cave 1", "Cave 2", "Cave 3"];
const barris = ["Barril 01", "Barril 02", "Barril 03"];

caves.forEach(c => {
    const op = document.createElement("option");
    op.textContent = c;
    selectCave.appendChild(op);
});

barris.forEach(b => {
    const op = document.createElement("option");
    op.textContent = b;
    selectBarril.appendChild(op);
});


selectBarril.addEventListener("change", () => {
    document.getElementById("barril-temp").textContent =
        (20 + Math.random() * 5).toFixed(1) + " °C";

    document.getElementById("barril-umi").textContent =
        (60 + Math.random() * 10).toFixed(0) + " %";
});
