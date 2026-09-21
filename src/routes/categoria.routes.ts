import { Router } from 'express';
import * as categoriaController from '../controllers/categoria.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/categoria:
 *   get:
 *     tags: [Categoria]
 *     summary: Lista as categorias
 *     responses:
 *       200:
 *         description: Categorias listadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
router.get('/', categoriaController.listar); 

/**
 * @openapi
 * /api/categoria/{id}:
 *   get:
 *     tags: [Categoria]
 *     summary: Busca categoria por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categorias listadas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Categoria'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', categoriaController.buscarPorId);

/**
 * @openapi
 * /api/categoria:
 *   post:
 *     tags: [Categoria]
 *     summary: Cria categoria
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             required: [nome, descricao]
 *             properties:
 *               nome: {type: 'string', example: 'Camiseta'}
 *               descricao: {type: 'string', example: 'Todas as camisetas'}
 *     responses:
 *       201:
 *         description: Categoria criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *         
 */
router.post('/', authMiddleware, categoriaController.criar); 

/**
 * @openapi
 * /api/categoria/{id}:
 *   patch:
 *     tags: [Categoria]
 *     summary: Atualiza categoria
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             required: [nome, descricao]
 *             properties:
 *               nome: {type: 'string', example: 'Camiseta'}
 *               descricao: {type: 'string', example: 'Todas as camisetas'}
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *         content: 
 *           application/json: 
 *             schema:
 *               #ref: '#/components/schemas/Categoria'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.patch('/:id', authMiddleware, categoriaController.atualizar); 

export default router;