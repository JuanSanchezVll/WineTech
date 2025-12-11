const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardCaveController");

router.get("/listarCaves/:idEmpresa", controller.listarCaves);          
router.get("/ultimasLeituras/:idCave", controller.ultimasLeituras);    
router.get("/kpi/ultima/:idCave", controller.kpiUltimaLeitura);        
router.get("/kpis/:idCave", controller.listarKpiCave);


module.exports = router;
