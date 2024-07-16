import { Router } from 'express'
import controller from '../controllers/prestamos.js'

const router = Router()

router.get('/', controller.find)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delet)

router.post('/createMany', controller.createMany)

export default router