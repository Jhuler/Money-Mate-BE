import { Router } from 'express'
import controller from '../controllers/cuentas.js'

const router = Router()

router.get('/', controller.find)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delet)

router.get('/detalle', controller.detalle)
router.post('/createMany', controller.createMany)

export default router