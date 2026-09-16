import { Router } from 'express';
import * as estoqueOpcaoController from '../controllers/estoque_opcao.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', estoqueOpcaoController.listar); //Listar (PÚBLICO)
router.get('/:id', estoqueOpcaoController.buscarPorId); //Buscar por ID (PÚBLICO)
router.post('/', authMiddleware, estoqueOpcaoController.criar); //Criar (PROTEGIDO)
router.patch('/:id', authMiddleware, estoqueOpcaoController.atualizar); //Atualizar (PROTEGIDO)

export default router;