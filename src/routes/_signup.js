import { Router } from "express"
import controller from '../controllers/_signup.js'

const router = Router()

router.post('/correo-existe', controller.correoExiste)
router.post('/send-codigo', controller.sendCodigo)
router.post('/verify-codigo', controller.verifyCodigo)
router.post('/crear-usuario', controller.crearUsuario)
router.post('/add-datos', controller.addDatos)
router.post('/cambiar-contrasena', controller.cambiarContrasena)

export default router