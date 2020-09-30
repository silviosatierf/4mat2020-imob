const controller = require('../controllers/identificacao')
const express = require('express')

const router = express.Router()

router.post('/', controller.novo)       // Create
router.get('/', controller.listar)      // Retrieve (all)
router.get('/:id', controller.obterUm)  // Retrieve (one)
router.put('/', controller.atualizar)   // Update
router.delete('/', controller.excluir)  // Delete 

module.exports = router