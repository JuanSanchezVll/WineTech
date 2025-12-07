var express = require("express");
var router = express.Router();

var painelAdministrativoController = require("../controllers/painelAdministrativoController");

router.get("/listar", function(req, res) {
    painelAdministrativoController.listar(req, res);
});

router.get("/deletar", function(req, res) {
    painelAdministrativoController.deletar(req, res);
});

router.get("/pesquisar", function(req, res) {
    painelAdministrativoController.pesquisar(req, res);
});

router.post("/cadastrar", function(req, res) {
    painelAdministrativoController.cadastrar(req, res);
});

router.post("/atualizar", function(req, res) {
    painelAdministrativoController.atualizar(req, res);
});

module.exports = router;