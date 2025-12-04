var express = require("express");
var router = express.Router();

var uvaController = require("../controllers/uvaController");

router.get("/listar", function(req, res) {
    uvaController.listar(req, res);
});

router.post("/cadastrar", function(req, res) {
    uvaController.cadastrar(req, res);
})

router.post("/atualizar", function(req, res) {
    uvaController.atualizar(req, res);
})

router.get("/deletar", function(req, res) {
    uvaController.deletar(req, res);
})

router.get("/pesquisar", function(req, res) {
    uvaController.pesquisar(req, res);
})

module.exports = router;