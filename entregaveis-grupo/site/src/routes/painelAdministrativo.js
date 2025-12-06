var express = require("express");
var router = express.Router();

var painelAdministrativoController = require("../controllers/painelAdministrativoController");

router.post("/cadastrar", function(req, res) {
    painelAdministrativoController.cadastrar(req, res);
})

router.post("/atualizar", function(req, res) {
    painelAdministrativoController.atualizarFuncionario(req, res);
})

router.get("/deletar", function(req, res) {
    painelAdministrativoController.deletar(req, res);
})

module.exports = router;