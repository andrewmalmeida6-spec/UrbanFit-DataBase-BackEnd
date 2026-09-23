import * as funcionarioController from '../controllers/funcionario.controller';
import { Router } from 'express';
import { autorizarCargo } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', funcionarioController.criar);
router.get('/', autorizarCargo('administrador'), funcionarioController.listar);
router.get('/:id', autorizarCargo('administrador'), funcionarioController.buscarPorID)