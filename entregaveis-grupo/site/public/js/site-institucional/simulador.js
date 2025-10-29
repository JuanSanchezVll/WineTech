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
        if (temperatura < 0) {
            perdaTemp = 0.1;
        } else if (temperatura > 0 && temperatura < 5) {
            perdaTemp = 0.06;
        } else if (temperatura >= 5 && temperatura <= 15) {
            perdaTemp = 0.015;
        } else if (temperatura > 15 && temperatura <= 20) {
            perdaTemp = 0.06;
        } else if (temperatura > 20) {
            perdaTemp = 0.1;
        }

        // Variável para o cálculo de umidade
        var perdaUmid = 0;
        if (umidade < 50) {
            perdaUmid = 0.05;
        } else if (umidade >= 50 && umidade < 60) {
            perdaUmid = 0.02;
        } else if (umidade >= 60 && umidade <= 75) {
            perdaUmid = 0;
        } else if (umidade > 75 && umidade <= 85) {
            perdaUmid = 0.02;
        } else if (umidade > 85) {
            perdaUmid = 0.05;
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
        estiloResultado.innerHTML = `<link rel="stylesheet" href="simulador_resultado.css">`

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

    }
}