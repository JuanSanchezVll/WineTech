var express = require("express");
var router = express.Router();

var barrilController = require("../controllers/barrilController");

router.get("/listar", function(req, res) {
    barrilController.listar(req, res);
})

router.post("/cadastrar", function(req, res) {
    barrilController.cadastrar(req, res);
})

module.exports = router;