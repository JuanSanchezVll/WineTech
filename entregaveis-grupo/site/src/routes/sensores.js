var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/listar", function(req, res) {
    sensorController.listar(req, res);
})

router.post("/cadastrar", function(req, res) {
    sensorController.cadastrar(req, res);
})

router.post("/atualizar", function(req, res) {
    sensorController.atualizar(req, res);
})

router.get("/deletar", function(req, res) {
    sensorController.deletar(req, res);
})

router.get("/pesquisar", function(req, res) {
    sensorController.pesquisar(req, res);
})

router.get("/listar/ativos", function(req, res) {
    sensorController.listarAtivosPorEmpresa(req, res);
})

module.exports = router;