import { Router } from 'express';
import * as estoqueOpcaoController from '../controllers/estoque_opcao.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/estoque:
 *   get:
 *     tags: [Estoque]
 *     summary: Lista as opções em estoque
 *     responses:
 *       200:
 *         description: Opções de estoque listadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estoque'
 */
router.get('/', estoqueOpcaoController.listar); 

/**
 * @openapi
 * /api/estoque/{id}:
 *   get:
 *     tags: [Estoque]
 *     summary: Busca uma opção em estoque por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Opção de estoque encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoque'
 *       404:
 *         description: Opção de estoque não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', estoqueOpcaoController.buscarPorId);

/**
 * @openapi
 * /api/estoque:
 *   post:
 *     tags: [Estoque]
 *     summary: Cria uma opção de estoque
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             required: [produto_id, cor, tamanho, quantidade_estoque]
 *             properties:
 *               produto_id: {type: integer, example: 1}
 *               cor: {type: string, example: "AZUL"}
 *               tamanho: {type: string, example: "G"}
 *               quantidade_estoque: {type: number, example: 100}
 *     responses:
 *       201:
 *         description: Opção de estoque criada
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoque'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', authMiddleware, estoqueOpcaoController.criar);

/**
 * @openapi
 * /api/estoque/{id}:
 *   patch:
 *     tags: [Estoque]
 *     summary: Adiciona itens ao estoque
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
 *             required: [produto_id, cor, tamanho, quantidade_estoque]
 *             properties:
 *               produto_id: {type: integer, example: 1}
 *               cor: {type: string, example: "AZUL"}
 *               tamanho: {type: string, example: "G"}
 *               quantidade_estoque: {type: number, example: 100}
 *     responses:
 *       200:
 *         description: Opção de estoque atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoque'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       403:
 *         description: Ação não permitida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Opção de estoque não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *    
 */
router.patch('/:id/adicionar/:quantidade', authMiddleware, estoqueOpcaoController.adicionar);

/**
 * @openapi
 * /api/estoque/{id}:
 *   patch:
 *     tags: [Estoque]
 *     summary: Adiciona itens ao estoque
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
 *             required: [produto_id, cor, tamanho, quantidade_estoque]
 *             properties:
 *               produto_id: {type: integer, example: 1}
 *               cor: {type: string, example: "AZUL"}
 *               tamanho: {type: string, example: "G"}
 *               quantidade_estoque: {type: number, example: 100}
 *     responses:
 *       200:
 *         description: Opção de estoque atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoque'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       403:
 *         description: Ação não permitida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Opção de estoque não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *    
 */
router.patch('/:id/adicionar/:quantidade', authMiddleware, estoqueOpcaoController.remover);

/**
 * @openapi
 * /api/estoque/{id}:
 *   delete:
 *     tags: [Estoque]
 *     summary: Deleta uma opção de estoque
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: {type: integer}
 *         example: 1
 *     responses:
 *       200:
 *         description: Opção de estoque deletada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoque'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Opção de estoque não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       
 */
router.delete('/:id', authMiddleware, estoqueOpcaoController.deletar);

export default router;