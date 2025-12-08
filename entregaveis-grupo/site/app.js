var ambiente_processo = 'desenvolvimento';
const { GoogleGenAI } = require("@google/genai");

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

var app = express();

var indexRouter = require("./src/routes/index");
var empresaRouter = require("./src/routes/empresas");
var usuarioRouter = require("./src/routes/usuarios");
var painelAdministrativoRouter = require("./src/routes/painelAdministrativo");
var caveRouter = require("./src/routes/caves");
var uvaRouter = require("./src/routes/uvas");
var barrilRouter = require("./src/routes/barris");
var sensorRoutes = require ("./src/routes/sensores")
var dashCaveRoutes = require ("./src/routes/dashboardCave")
var dashBarrilRoutes = require ("./src/routes/dashboardBarril")
var dashIndexRoutes = require ("./src/routes/dashboardIndex")

// var leituraRouter = require("./src/routes/leituras");
// var alertaRouter = require("./src/routes/alertas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/empresas", empresaRouter);
app.use("/usuarios", usuarioRouter);
app.use("/painelAdministrativo", painelAdministrativoRouter);
app.use("/caves", caveRouter);
app.use("/uvas", uvaRouter);
app.use("/barris", barrilRouter);
app.use("/sensores", sensorRoutes);
app.use("/dashboardCave", dashCaveRoutes);
app.use("/dashboardBarril", dashBarrilRoutes);
app.use("/dashboardIndex", dashIndexRoutes);


app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;
    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

async function gerarResposta(mensagem) {
    try {
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Em um paragráfo responda: ${mensagem}`
        });
        const resposta = (await modeloIA).text;
        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
                                                                                                  
    Servidor do seu site já está rodando! Acesse: http://${HOST_APP}:${PORTA_APP}
    Ambiente: ${process.env.AMBIENTE_PROCESSO}
    `);
});
