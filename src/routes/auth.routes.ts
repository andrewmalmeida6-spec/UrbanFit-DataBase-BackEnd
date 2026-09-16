import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auntenticação]
 *     summary: Faz login e devolve um token JWT
 *     description: >
 *       Troca email e senha em um token JWT com validade de 1 dia.
 *       Use o botão **authorize** para acessar rotas protegidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'bytes@teste.com'
 *               senha:
 *                 type: string
 *                 example: '123456'  
 *   responses:
 *     200:
 *       description: Login feito com sucesso
 *       content:
 *         application/json:
 *           schemas:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: errYHAUSusfasyttASuiasdIAshd...
 *               cliente:
 *                 $ref: '#/components/schemas/Cliente'
 *     401:
 *       description: E-mail ou senha inválidos
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RespostaErro'
 */
router.post('/login', authController.login);

export default router;