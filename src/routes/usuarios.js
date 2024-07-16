import { Router } from "express"
import controller from "../controllers/usuarios.js"

const router = Router()

// router.get('/', controller.find)
router.post('/', controller.create)
router.patch('/:id', controller.update)
// router.delete('/:id', controller.delet)

router.get("/login", controller.login)
router.get("/dispositivos-conectados", controller.dispositivosConectados)
router.post("/logout", controller.logout)
router.post("/eliminar-cuenta", controller.eliminarCuenta)
router.post("/validar-contrasena", controller.validarContrasena)
router.post("/cambiar-contrasena", controller.cambiarContrasena)
router.post("/cambiar-correo", controller.cambiarCorreo)

export default router