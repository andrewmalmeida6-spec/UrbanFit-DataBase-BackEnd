import * as funcionarioController from '../controllers/funcionario.controller';
import { Router } from 'express';
import { autorizar, autorizarCargo } from '../middlewares/auth.middleware';

const router = Router();

router.use(autorizarCargo('administrador')),

router.post('/', autorizar('cliente'), funcionarioController.criar);
router.get('/', funcionarioController.listar);
router.get('/:id', funcionarioController.buscarPorID);

export default router;