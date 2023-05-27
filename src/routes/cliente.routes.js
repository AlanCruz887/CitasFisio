const {Router} = require('express')
const router = Router()
const clienteController = require('../controllers/cliente.controller')


router.get('/clientes',clienteController.obtenerTodosLosClientes)
router.post('/insertarCliente',clienteController.insertarCliente)
router.get('/Ucliente/:ci',clienteController.obtenerUnCliente)
router.delete('/eliminarCliente/:ci',clienteController.eliminarCliente)
router.put('/actualizarCliente/:ci',clienteController.actualizarCliente)

module.exports = router