var express = require("express");
var router = express.Router();

var caveController = require("../controllers/caveController");

router.get("/listar", function(req, res) {
    caveController.listar(req, res);
})

router.post("/cadastrar", function(req, res) {
    caveController.cadastrar(req, res);
})

router.post("/atualizar", function(req, res) {
    caveController.atualizar(req, res);
})

router.get("/deletar", function(req, res) {
    caveController.deletar(req, res);
})

router.get("/pesquisar", function(req, res) {
    caveController.pesquisar(req, res);
})

module.exports = router;