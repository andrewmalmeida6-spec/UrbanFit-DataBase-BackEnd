import * as itemPedidoController from '../controllers/item_pedido.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Router } from 'express';

const router = Router();

router.use(authMiddleware);

router.get('/', itemPedidoController.listar); 
router.get('/:id', itemPedidoController.buscarPorId); 
router.post('/', itemPedidoController.criar); 
router.patch('/:id/adicionar/:quantidade', itemPedidoController.adicionar)
router.patch('/:id/remover/:quantidade', itemPedidoController.remover)
router.delete('/:id', itemPedidoController.deletar); 

export default router;