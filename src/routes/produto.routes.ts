import { Router } from 'express';
import { authMiddleware } from "../middlewares/auth.middleware";
import * as produtoController from '../controllers/produto.controller';

const router = Router();

/**
 * @openapi
 * /api/produto:
 *   get:
 *     tags: [Produto]
 *     summary: Lista os produtos
 *     responses:
 *       200:
 *         description: Produtos listados
 *         content:
 *           application/json:
 *             schemas:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/', produtoController.listar);

/**
 * @openapi
 * /api/produto/{id}:
 *   get:
 *     tags: [Produto]
 *     summary: Busca um produto por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Produtos listados
 *         content:
 *           application/json:
 *             schemas:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schemas:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', produtoController.buscarPorId);

/**
 * @openapi
 * /api/produto:
 *   post:
 *     tags: [Produto]
 *     summary: Cria produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schemas:
 *             type: object
 *             required: [categoria_id, nome, marca, preco_base]
 *             properties:
 *               categoria_id: {type: integer, example: 1}
 *               nome: {type: string, example: "Camiseta Sport"}
 *               marca: {type: string, example: "adibas"}
 *               preco_base: {type: number, example: 10}
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/component/schemas/Produto'
 */
router.post('/', authMiddleware, produtoController.criar);

/**
 * @openapi
 * /api/produto/{id}:
 *   patch:
 *     tags: [Produto]
 *     summary: Atualiza produto
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
 *             type: object
 *             required: [categoria_id, nome, marca, preco_base]
 *             properties:
 *               categoria_id: {type: integer, example: 1}
 *               nome: {type: string, example: "Camiseta Sport"}
 *               marca: {type: string, example: "adibas"}
 *               preco_base: {type: number, example: 10}
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 * 
 */
router.patch('/:id', authMiddleware, produtoController.atualizar);

export default router;