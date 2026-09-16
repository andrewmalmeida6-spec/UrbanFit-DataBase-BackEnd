import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as pedidoController from '../controllers/pedido.controller'

const router    = Router();

router.use      (authMiddleware);

router.get      ('/', pedidoController.listar);
router.get      ('/:id', pedidoController.buscarPorId);
router.post     ('/', pedidoController.criar);
router.patch    ('/:id/finalizar', pedidoController.finalizar)
router.patch    ('/:id/cancelar', pedidoController.cancelar)

export default router;