import { Router } from 'express'
import controller from '../controllers/categorias.js'

const router = Router()

router.get('/', controller.find)
// router.get('/tipo/:id', controller.findTipo)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delet)

router.get('/movimientos', controller.getMovimientos)
router.post('/createMany', controller.createMany)

export default router