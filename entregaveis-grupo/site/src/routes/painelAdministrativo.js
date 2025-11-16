var express = require("express");
var router = express.Router();

var painelAdministrativoController = require("../controllers/painelAdministrativoController");

router.post("/usuarios/cadastrar", function(req, res) {
    painelAdministrativoController.cadastrarUsuario(req, res);
})

module.exports = router;