var express = require("express");
var router = express.Router();

var dashboardIndexController = require("../controllers/dashboardIndexController");

router.get("/totalAlertasMensal/empresa/:idEmpresa", function(req, res) {
    dashboardIndexController.obterTotalAlertasNoMes(req, res);
})

router.get("/graficos/alertas/empresa/:idEmpresa", function(req, res) {
    dashboardIndexController.listarAlertasPorCaveNoMes(req, res);
}) 

router.get("/ultimaLeitura/empresa/:idEmpresa/caves/:idCave/barris/:idBarril", function(req, res) {
    dashboardIndexController.obterUltimaLeituraNoBarril(req, res);
})


router.get("/alertas/temperatura/empresa/:idEmpresa", function(req, res) {
    dashboardIndexController.obterCaveComAlertaTemperatura(req, res);
});

router.get("/alertas/umidade/empresa/:idEmpresa", function(req, res) {
    dashboardIndexController.obterCaveComAlertaUmidade(req, res);
});

module.exports = router;

module.exports = router;