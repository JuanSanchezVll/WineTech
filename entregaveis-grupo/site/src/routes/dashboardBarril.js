var express = require("express");
var router = express.Router();
var barrilController = require("../controllers/dashboardBarrilController");

router.get("/listar/:idEmpresa", function (req, res) {
    barrilController.listarBarris(req, res);
});

router.get("/medidas/:idBarril", function (req, res) {
    barrilController.buscarMedidas(req, res);
});

module.exports = router;