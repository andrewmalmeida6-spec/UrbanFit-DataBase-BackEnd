import * as funcionarioController from '../controllers/funcionario.controller';
import { Router } from 'express';
import { authMiddleware, autorizarCargo } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware, autorizarCargo('administrador')),

/**
 * @openapi
 * /api/funcionario:
 *   post:
 *     tags: [Funcionário]
 *     summary: Cria funcionário (apenas administrador)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         descriprion: Funcionário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 */
router.post('/', funcionarioController.criar);

/**
 * @openapi
 * /api/funcionario:
 *   get:
 *     tags: [Funcionário]
 *     summary: Lista funcionários (apenas administrador)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         descriprion: Funcionários listados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Funcionario'
 */
router.get('/', funcionarioController.listar);

/**
 * @openapi
 * /api/funcionario:
 *   post:
 *     tags: [Funcionário]
 *     summary: Busca funcionário por ID (apenas administrador)
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
 *         descriprion: Funcionário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       404:
 *         descriprion: Funcionário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', funcionarioController.buscarPorID);

export default router;