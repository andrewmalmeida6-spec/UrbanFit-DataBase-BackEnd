import * as funcionarioController from '../controllers/funcionario.controller';
import { Router } from 'express';
import { authMiddleware, autorizar, autorizarCargo } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware, autorizarCargo('administrador')),

router.post('/', funcionarioController.criar);
router.get('/', funcionarioController.listar);
router.get('/:id', funcionarioController.buscarPorID);

export default router;