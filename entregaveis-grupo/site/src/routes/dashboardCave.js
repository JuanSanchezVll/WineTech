const express = require("express");
const router = express.Router();
const dashboardCaveController = require("../controllers/dashboardCaveController");

router.get("/infos/:idEmpresa", (req, res) => {
    dashboardCaveController.listar(req, res);
});

module.exports = router;
