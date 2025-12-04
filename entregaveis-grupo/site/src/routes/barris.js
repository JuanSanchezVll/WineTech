var express = require("express");
var router = express.Router();

var barrilController = require("../controllers/barrilController");

router.get("/listar", function(req, res) {
    barrilController.listar(req, res);
})

module.exports = router;