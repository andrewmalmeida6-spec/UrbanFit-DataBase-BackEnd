import * as funcionarioController from '../controllers/funcionario.controller';
import { Router } from 'express';
import { autorizarCargo } from '../middlewares/auth.middleware';

const router = Router();

router.use(autorizarCargo('administrador')),

router.post('/', funcionarioController.criar);
router.get('/', funcionarioController.listar);
router.get('/:id', funcionarioController.buscarPorID)