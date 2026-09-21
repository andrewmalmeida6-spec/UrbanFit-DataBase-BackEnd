import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as pedidoController from '../controllers/pedido.controller'

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/pedido/{cliente_id}:
 *   get:
 *     tags: [Pedido]
 *     summary: Lista os pedidos
 *     parameters:
 *       - name: cliente_id
 *         in: path
 *         required: true
 *         schema: {type: integer}
 *         example: 1
 *     responses:
 *       200:
 *         description: Pedidos listados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get('/:cliente_id', pedidoController.listar);

/**
 * @openapi
 * /api/pedido/{id}:
 *   get:
 *     tags: [Pedido]
 *     summary: Busca um pedido por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: {type: integer}
 *         example: 1
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', pedidoController.buscarPorId);

/**
 * @openapi
 * /api/pedido:
 *   post:
 *     tags: [Pedido]
 *     summary: Cria um pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cliente_id]
 *             properties:
 *               cliente_id: {type: integer, example: 1}
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', pedidoController.criar);

/**
 * @openapi
 * /api/pedido:
 *   patch:
 *     tags: [Pedido]
 *     summary: Finaliza um pedido
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: {type: integer}
 *         example: 1
 *     responses:
 *       200:
 *         description: Pedido finalizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.patch('/:id/finalizar', pedidoController.finalizar);

/**
 * @openapi
 * /api/pedido:
 *   patch:
 *     tags: [Pedido]
 *     summary: Cancela um pedido
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: {type: integer}
 *         example: 1
 *     responses:
 *       200:
 *         description: Pedido cancelado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.patch('/:id/cancelar', pedidoController.cancelar);

export default router;