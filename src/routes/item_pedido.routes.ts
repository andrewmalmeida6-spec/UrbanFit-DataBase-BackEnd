import * as itemPedidoController from '../controllers/item_pedido.controller';
import { authMiddleware, autorizar } from '../middlewares/auth.middleware';
import { Router } from 'express';

const router = Router();

router.use(authMiddleware, autorizar('cliente'));

/**
 * @openapi
 * /api/item/pedido/{id}:
 *   get:
 *     tags: [Item]
 *     summary: Lista os itens pedidos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Itens listados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item_pedido'
 */
router.get('/pedido/:id', autorizar('funcionario'), itemPedidoController.listar); 

/**
 * @openapi
 * /api/item/{id}:
 *   get:
 *     tags: [Item]
 *     summary: Busca um item por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item_pedido'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', autorizar('funcionario'), itemPedidoController.buscarPorId); 

/**
 * @openapi
 * /api/item:
 *   post:
 *     tags: [Item]
 *     summary: Cria o pedido de um item
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pedido_id, estoque_opcao_id, quantidade]
 *             properties:
 *               pedido_id: {type: integer, example: 1}
 *               estoque_opcao_id: {type: integer, example: 1}
 *               quantidade: {type: integer, example: 10}
 *     responses:
 *       201:
 *         description: Pedido de item criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item_pedido'
 */
router.post('/', itemPedidoController.criar); 

/**
 * @openapi
 * /api/item/{id}/adicionar/{quantidade}:
 *   patch:
 *     tags: [Item]
 *     summary: Aumenta a quantidade de itens pedidos comforme a quantidade inserida
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *       - name: quantidade
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 5
 *     responses:
 *       200:
 *         description: Itens adicionados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item_pedido'
 *       403:
 *         description: Ação não permitida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.patch('/:id/adicionar/:quantidade', itemPedidoController.adicionar);

/**
 * @openapi
 * /api/item/{id}/remover/{quantidade}:
 *   patch:
 *     tags: [Item]
 *     summary: Diminui a quantidade de itens pedidos comforme a quantidade inserida
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *       - name: quantidade
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 5
 *     responses:
 *       200:
 *         description: Itens removidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item_pedido'
 *       403:
 *         description: Ação não permitida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.patch('/:id/remover/:quantidade', itemPedidoController.remover);

/**
 * @openapi
 * /api/item/{id}:
 *   delete:
 *     tags: [Item]
 *     summary: Deleta um pedido de item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Item deletado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item_pedido'
 *       403:
 *         description: Ação não permitida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.delete('/:id', itemPedidoController.deletar); 

export default router;