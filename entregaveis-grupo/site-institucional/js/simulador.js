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
        if (temperatura < 10) {
            perdaTemp = 1;
        } else if (temperatura >= 10 && temperatura <= 13) {
            perdaTemp = 0.3;
        } else if (temperatura >= 14 && temperatura <= 16) {
            perdaTemp = 0.03;
        } else if (temperatura > 16 && temperatura <= 20) {
            perdaTemp = 0.3;
        } else if (temperatura > 20) {
            perdaTemp = 1;
        }

        // Variável para o cálculo de umidade
        var perdaUmid = 0;
        if (umidade < 50) {
            perdaUmid = 1;
        } else if (umidade >= 50 && umidade < 60) {
            perdaUmid = 0.3;
        } else if (umidade >= 60 && umidade <= 75) {
            perdaUmid = 0.03;
        } else if (umidade > 75 && umidade <= 85) {
            perdaUmid = 0.3;
        } else if (umidade > 85) {
            perdaUmid = 1;
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

        // Cenário da situação dos vinhos do cliente
        var cenario = "";
        if (perda == 1) {
            cenario = "Alerta máximo: Perda total";
        } else if (perda == 0.3) {
            cenario = "Alerta moderado: Perda moderada";
        } else {
            cenario = "Cenário ideal: Perda mínima";
        }

        // Variáveis para o cálculo da 2° SAIDA: relatório do cave
        var garrafaPorBarril = 300;
        var totalGarrafa = quantidadeBarris * garrafaPorBarril;
        /* Quantidade de garrafas por barril é de 300, e o valor médio de uma garrafa
            de vinho tinto de corpo médio é de 120 R$, ou seja o preço de cada barril
            é de aproximadamente 36000 R$ */
        var valorCave = quantidadeBarris * precoBarril;

        // Variáveis para a 3° SAIDA: Sem Winetech
        var barrisPerdidos = Math.round(quantidadeBarris * perda);
        var totalMensal = precoBarril * quantidadeBarris * 6;
        var prejuizo = precoBarril * barrisPerdidos * 6;
        var porcentagemPrejuizo = (prejuizo / totalMensal) * 100;

        // Variáveis para a 4° SAIDA: Com Winetech | 1° SAIDA:
        if (perda == 0.03) {
            var reducaoPrejuizo = precoBarril * barrisPerdidos;
            var cantoDosAnjosPercent = 0.03;
        } else {
            var reducaoPrejuizo = prejuizo * 0.1;
            var cantoDosAnjosPercent = 0.1;
        }
        var cantoDosAnjos = quantidadeBarris * cantoDosAnjosPercent;
        var barrisPreservados = quantidadeBarris - barrisPerdidos + cantoDosAnjos;
        if (barrisPreservados < 0) {
            barrisPreservados = 0;
        }

        // Estilização do CSS
        estiloResultado.innerHTML = `<style>
                .resultados {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    max-width: 350px;
                    max-height: 100%;
                    text-align: center;
                    gap: 15px;
                    margin-top: 40px;
                    border: solid 2px #70160E;
                    border-radius: 10px;
                    padding: 10px;
                    background-color: #eeeded;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                    }

                    .resultados hr {
                        width: 300px;
                    }

                    .saidasWinetech {
                    margin-top: 30px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    gap: 40px;
                    }

                    #comWinetech,
                    #semWinetech {
                    max-width: 380px;
                    max-height: 100%;
                    text-align: center;
                    border-radius: 10px;
                    padding: 10px;
                    background-color: #eeeded;
                    border: solid 2px #70160E;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                    }
            </style>`;

        // 1 SAIDA: Economia potencial com Winesafe
        resumoLucro.innerHTML = `<div class="resumo">
            <br><b>Economia potencial com nossos serviços:</b><b> R$</b><span style="color: green;"><b>${reducaoPrejuizo.toFixed(2)}</b></span><br>
            </div>`;

        // 2 SAIDA: Relatório do cave
        relatorio.innerHTML = `<hr>
            <h3>Cenário Simulado</h3>
            <p><b>Quantidade de barris:</b> ${quantidadeBarris}</p>
            <p><b>Total de garrafas:</b> ${totalGarrafa}</p>
            <p><b>Valor total do cave: </b>R$ ${valorCave}</p>`;

        // 3 SAIDA: Sem Winetech
        if (perda == 0.03) {
            semWinetech.innerHTML = `<h1>Sem a Winetech</h1>
                <b>Porcentagem de perda estimada:</b> <b><span style="color: red;">3%<br></span></b>
                <b>Cenário:</b> ${cenario}<br>
                <b>Quantidade de barris perdidos:</b> <b>${barrisPerdidos}</b> barris perdidos<br>
                <b>Prejuízo semestral estimado:</b> <b>R$</b> <span style="color: red;">${prejuizo.toFixed(2)}</span>`;
        } else if (perda == 0.3) {
            semWinetech.innerHTML = `<h1>Sem a Winetech</h1>
                <b>Porcentagem de perda estimada:</b> <b><span style="color: red;">30%<br></span></b>
                <b>Cenário:</b> ${cenario}<br>
                <b>Quantidade de barris perdidos:</b> <b>${barrisPerdidos}</b> barris perdidos<br>
                <b>Prejuízo semestral estimado:</b> <b>R$</b> <span style="color: red;">${prejuizo.toFixed(2)}</span>`;
        } else {
            semWinetech.innerHTML = `<h1>Sem a Winetech</h1>
                <b>Porcentagem de perda estimada:</b> <b><span style="color: red;">100%<br></span></b>
                <b>Cenário:</b> ${cenario}<br>
                <b>Quantidade de barris perdidos:</b> <b>${barrisPerdidos}</b> barris perdidos<br>
                <b>Prejuízo semestral estimado:</b> <b>R$</b> <span style="color: red;">${prejuizo.toFixed(2)}</span>`;
        }

        // 4 SAIDA: Com Winetech
        if (perda == 0.03) {
            comWinetech.innerHTML = `<h1>Com a Winetech</h1>
                <b>Porcentagem de redução de perda estimada:</b> <b><span style="color: green;">3%</span></b><br>  
                <b>Redução de prejuízo semestral estimado:</b> <b>R$</b> <b><span style="color: green;">${prejuizo.toFixed(2)}</span></b><br>
                <b>Barris preservados pelos nossos serviços:</b> <b>${cantoDosAnjos.toFixed(0)}</b> barris<br>
                <b>Total de barris preservados:</b> <b>${barrisPreservados.toFixed(0)}</b> barris preservados<br>
                <b>com a WineTech, seu cave está protegido e o valor do vinho é preservado!</b>`;
        } else {
            comWinetech.innerHTML = `<h1>Com a Winetech</h1>
                <b>Porcentagem de redução de perda estimada:</b> <b><span style="color: green;">10%</span></b><br>  
                <b>Redução de prejuízo semestral estimado:</b> <b>R$</b> <b><span style="color: green;">${reducaoPrejuizo.toFixed(2)}</span></b><br>
                <b>Barris preservados pelos nossos serviços:</b> <b>${cantoDosAnjos.toFixed(0)}</b> barris<br>
                <b>Total de barris preservados:</b> <b>${barrisPreservados.toFixed(0)}</b> barris preservados<br>
                <b>com a WineTech, seu cave está protegido e o valor do vinho é preservado!</b>`;
        }
    }
}