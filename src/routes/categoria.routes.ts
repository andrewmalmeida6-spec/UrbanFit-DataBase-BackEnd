import { Router } from 'express';
import * as categoriaController from '../controllers/categoria.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();


router.get('/', categoriaController.listar); 
router.get('/:id', categoriaController.buscarPorId);
router.post('/', authMiddleware, categoriaController.criar); 
router.patch('/:id', authMiddleware, categoriaController.atualizar); 

export default router;