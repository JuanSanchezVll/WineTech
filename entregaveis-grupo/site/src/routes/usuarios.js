var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar-com-codigo", function(req, res) {
    usuarioController.cadastrarComCodigo(req, res);
});

router.post("/cadastrar-sem-codigo", function(req, res) {
    usuarioController.cadastrarSemCodigo(req, res);
});

module.exports = router;