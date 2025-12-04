var express = require("express");
var router = express.Router();

var barrilController = require("../controllers/barrilController");

router.get("/listar", function(req, res) {
    barrilController.listar(req, res);
})

router.post("/cadastrar", function(req, res) {
    barrilController.cadastrar(req, res);
})

router.post("/atualizar", function(req, res) {
    barrilController.atualizar(req, res);
})

router.get("/pesquisar", function(req, res) {
    barrilController.pesquisar(req, res);
})

module.exports = router;