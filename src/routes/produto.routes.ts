import { Router } from 'express';
import { authMiddleware } from "../middlewares/auth.middleware";
import * as produtoController from '../controllers/produto.controller';

const router = Router();

router.get('/', produtoController.listar); //LISTAR (PÚBLICO)
router.get('/:id', produtoController.buscarPorId); // BUSCAR POR ID (PÚBLICO)
router.post('/', authMiddleware, produtoController.criar) //CRIAR (PROTEGIDO)
router.patch('/:id', authMiddleware, produtoController.atualizar) //ATUALIZAR (PROTEGIDO)

export default router;