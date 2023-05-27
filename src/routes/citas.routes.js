const {Router} = require('express')
const router = Router()
const principal = require ("../controllers/principal")
const citaController = require("../controllers/cita.controller")


router.get('/',principal.iniciarPagina)
router.get('/testimonio',principal.testimonios)
router.get('/login',principal.login)

router.get('/citas',citaController.obtenerTodasCitas)
router.get('/buscar/:ic',citaController.obtenerUnaCita)
router.post('/',citaController.insertarCita)
router.put('/actualizarCita/:ic',citaController.actualizarCita)
router.delete('/eliminarCita/:ic',citaController.eliminarCita)


module.exports = router