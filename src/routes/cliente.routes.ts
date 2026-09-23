import { Router } from 'express';
import * as clienteController from '../controllers/cliente.controller';
import { authMiddleware, autorizar } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/cliente:
 *   post:
 *     tags: [Cliente]
 *     summary: Cadastro de cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             required: [nome, cpf, telefone, email, senha]
 *             properties:
 *               nome: {type: 'string', example: 'Senhorita Bytes'}
 *               cpf: {type: 'string', example: '12345678912'}
 *               telefone: {type: 'string', example: '24123456789'}
 *               email: {type: 'string', example: 'bytes@teste.com'}
 *               senha: {type: 'string', example: '123456'}
 *     responses:
 *       201:
 *         description: Cliente criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       409:
 *         description: CPF ou e-mail já cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', clienteController.criar);

/**
 * @openapi
 * /api/cliente:
 *   get:
 *     tags: [Cliente]
 *     summary: Lista todos os clientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clientes listados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/', authMiddleware, autorizar('funcionario'), clienteController.listar);

/**
 * @openapi
 * /api/cliente/{id}:
 *   get:
 *     tags: [Cliente]
 *     summary: Busca cliente por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type:integer }
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', authMiddleware, autorizar('funcionario'), clienteController.buscarPorId);

export default router;

