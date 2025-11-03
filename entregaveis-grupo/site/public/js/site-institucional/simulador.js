function simular() {  
    // Variáveis para os cálculos
    var quantidadeBarris = Number(inputQuantidadeBarris.value);
    var precoBarril = Number(inputPrecoBarril.value);
    var temperatura = Number(inputTemperaturaMedia.value);
    var umidade = Number(inputUmidadeMedia.value);

    // Variáveis para validações
    var msg_erro_vazio = " é obrigatório. Insira um valor válido";
    var msg_erro_entrada_nula =
        " não pode ser menor ou igual a zero. Insira um valor válido";

    // Validações
    if (inputQuantidadeBarris.value == "") {
        alert("O campo 'Quantidade barris'" + msg_erro_vazio);
    } else if (quantidadeBarris <= 0) {
        alert("O campo 'Quantidade barris'" + msg_erro_entrada_nula);
    } else if (quantidadeBarris % 1 != 0) {
        alert(
            "O campo 'Quantidade barris' não pode ser um número decimal. Insira um número inteiro"
        );
    } else if (inputPrecoBarril.value == "") {
        alert("O campo 'Preço barril'" + msg_erro_vazio);
    } else if (precoBarril <= 0) {
        alert("O campo 'Preço barril'" + msg_erro_entrada_nula);
    } else if (inputTemperaturaMedia.value == "") {
        alert("O campo 'Temperatura média'" + msg_erro_vazio);
    } else if (temperatura <= 0) {
        alert("O campo 'Temperatura média'" + msg_erro_entrada_nula);
    } else if (inputUmidadeMedia.value == "") {
        alert("O campo 'Umidade média'" + msg_erro_vazio);
    } else if (umidade <= 0 || umidade >= 100) {
        alert(
            "O campo 'Umidade média' deve estar entre 1 e 100. Insira um valor válido"
        );

        // Variáveis e cálculos para os resultados
    } else {
        // Variável para o cálculo de temperatura
        var perdaTemp = 0;
        if (temperatura < -5) {
            perdaTemp = 0.1;
        } else if (temperatura >= -5 && temperatura < 7) {
            perdaTemp = 0.06;
        } else if (temperatura >= 7 && temperatura <= 18) {
            perdaTemp = 0.015;
        } else if (temperatura > 19 && temperatura <= 21) {
            perdaTemp = 0.06;
        } else if (temperatura > 21) {
            perdaTemp = 0.1;
        }

        // Variável para o cálculo de umidade
        var perdaUmid = 0;
        if (umidade < 50) {
            perdaUmid = 0.1;
        } else if (umidade >= 50 && umidade <= 64) {
            perdaUmid = 0.06;
        } else if (umidade >= 65 && umidade <= 75) {
            perdaUmid = 0;
        } else if (umidade > 75 && umidade <= 80) {
            perdaUmid = 0.06;
        } else if (umidade > 80) {
            perdaUmid = 0.1;
        }

        /* Nessa parte ele vai atribuir a variavel perda, qual for a perda maior, 
            pois se uma das duas condições de temperatura e umidade estiverem estáveis
            o vinho fica propício a estragar */
        var perda = 0;
        if (perdaTemp >= perdaUmid) {
            perda = perdaTemp;
        } else {
            perda = perdaUmid;
        }

        // Calcular a a porcentagem com a Winetech
        var porcentagemFinal = perda - (perda * 0.1)

        // Cenário da situação dos vinhos do cliente
        var cenario = "";
        if (perda > 0.06) {
            cenario = '<span style="color: rgba(137, 7, 7, 1);"><b>Alerta máximo: Perda máxima</b></span>';
        } else if (perda >= 0.02 && perda <= 0.06) {
            cenario = '<span style="color: rgb(209, 175, 5);"><b>Alerta moderado: Perda moderada</b></span>';
        } else {
            cenario = '<span style="color: rgba(0, 144, 22, 1);"><b>Cenário ideal: Perda mínima</b></span>';
        }

        // Variáveis para a 3° SAIDA: Sem Winetech
        var precoTotal = quantidadeBarris * precoBarril;
        var prejuizo = precoTotal * perda;
        var valorRecuperado = prejuizo * 0.1;
        var valorFinal = prejuizo - valorRecuperado;

        if (perda == 0.015) {
            perda = '01,5';
        } else if (perda == 0.02) {
            perda = '02,0';
        } else if (perda == 0.05) {
            perda = '05,0';
        } else if (perda == 0.06) {
            perda = '06,0';
        } else if (perda == 0.1) {
            perda = '10.0';
        }

        if (porcentagemFinal == 0.0135) {
            porcentagemFinal = '01,3';
        } else if (porcentagemFinal == 0.018) {
            porcentagemFinal = '01,8';
        } else if (porcentagemFinal == 0.045) {
            porcentagemFinal = '04,5';
        } else if (porcentagemFinal == 0.054) {
            porcentagemFinal = '05,4';
        } else if (porcentagemFinal == 0.09) {
            porcentagemFinal = '09,0';
        }

        // Link do css do resultado do simulador
        estiloResultado.innerHTML = `<link rel="stylesheet" href="style/site-institucional/simulador_resultado.css">`

        colunaCenario.innerHTML = `${cenario}`;

        colunaSituacao.innerHTML = `Situação`;  
        colunaPerda.innerHTML = `Perda (%)`;
        colunaValor.innerHTML = `Valor (R$)`;

        colunaFatorPerda.innerHTML = `<b>Sem Controle</b>`
        colunaPorcentagem.innerHTML = `<span style="color:rgb(189, 0, 0);"><b>${perda}%</b></span>`;
        colunaValorPerdido.innerHTML = `<span style="color:rgb(189, 0, 0);"><b>${prejuizo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b></span>`;

        colunaFatorRecuperado.innerHTML = `<b>Recuperação (10%)</b>`
        colunaPercentualRecuperado.innerHTML = `—`;
        colunaValorRecuperado.innerHTML = `<span style="color:green;"><b>+ ${valorRecuperado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b></span>`;

        colunaFatorFinal.innerHTML = `<b>Com a Winetech</b>`
        colunaPercentualFinal.innerHTML = `<b>${porcentagemFinal}%</b>`;
        colunaValorFinal.innerHTML = `<b>${valorFinal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>`;

        // Seleciona o canvas do gráfico
        const ctx = document.getElementById('chartBarril').getContext('2d');

        // Dados fictícios de exemplo para as últimas 24 horas
        const mes = [
            '1° mês', '2° mês', '3° mês', '4° mês', '5° mês', '6° mês', 
            '7° mês', '8° mês', '9° mês', '10° mês', '11° mês', '12° mês'
        ];

        const semControle = [];

        const comControle = [];

        var contador_mes = 0;
        var mes_repeticao = 12;
        var prejuizo_calculo = 0;
        var valorFinal_calculo = 0;
        while (contador_mes < mes_repeticao ) {
            contador_mes++
            prejuizo_calculo += prejuizo;
            valorFinal_calculo += valorFinal;

            semControle.push(prejuizo_calculo);
            comControle.push(valorFinal_calculo);
        }

        const barrilChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: mes,
                datasets: [
                    {
                        label: 'Perda sem o controle (R$)',
                        data: semControle,
                        borderColor: 'rgb(189, 0, 0)',
                        backgroundColor: 'rgba(158, 0, 0, 0.14)',
                        tension: 0.3,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Perda com a Winetech (R$)',
                        data: comControle,
                        borderColor: 'green',
                        backgroundColor: 'rgba(3, 216, 10, 0.09)',
                        tension: 0.3,
                        fill: true,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                responsive: true,
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
                        text: 'Acompanhe a estimativa anual sobre seu negócio',
                        font: { size: 18, family: 'Poppins', weight: '600' },
                        color: '#70160E'
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
                        ticks: { color: 'black' },
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Valor (R$)',
                            color: '#70160E',
                            font: { weight: '600' }
                        }
                    },
                }
            }
        });

    }
}