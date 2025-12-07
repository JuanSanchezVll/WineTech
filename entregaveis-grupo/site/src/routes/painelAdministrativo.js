var express = require("express");
var router = express.Router();

// Importando o controller específico de Usuário (recomendado)
var usuarioController = require("../controllers/painelAdministrativoController");

<<<<<<< Updated upstream
router.post("/cadastrar", function(req, res) {
    painelAdministrativoController.cadastrar(req, res);
})

router.post("/atualizar", function(req, res) {
    painelAdministrativoController.atualizarFuncionario(req, res);
})

router.get("/deletar", function(req, res) {
    painelAdministrativoController.deletar(req, res);
})

=======
// Rotas GET (Listar, Deletar, Pesquisar)
router.get("/listar", function(req, res) {
    usuarioController.listar(req, res);
});

router.get("/deletar", function(req, res) {
    usuarioController.deletar(req, res);
});

router.get("/pesquisar", function(req, res) {
    usuarioController.pesquisar(req, res);
});

// Rotas POST (Cadastrar, Atualizar)
router.post("/cadastrar", function(req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/atualizar", function(req, res) {
    usuarioController.atualizar(req, res);
});

>>>>>>> Stashed changes
module.exports = router;