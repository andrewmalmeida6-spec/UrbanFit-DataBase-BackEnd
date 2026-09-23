import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

/**
 * @openapi
 * /api/auth/login/cliente:
 *   post:
 *     tags: [Autenticação]
 *     summary: Faz login de cliente e devolve um token JWT
 *     description: >
 *       Troca email e senha em um token JWT com validade de 1 dia.
 *       Use o botão **authorize** para acessar rotas protegidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             required: [email, senha, perfil]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'bytes@teste.com'
 *               senha:
 *                 type: string
 *                 example: '123456' 
 *               perfil:
 *                 type: 'cliente' | 'funcionario'
 *                 example 
 *     responses:
 *       200:
 *         description: Login feito com sucesso
 *         content:
 *           application/json:
 *             schemas:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: errYHAUSusfasyttASuiasdIAshd...
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: E-mail ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/login/cliente', authController.loginCliente);

/**
 * @openapi
 * /api/auth/login/funcionario:
 *   post:
 *     tags: [Autenticação]
 *     summary: Faz login de funcionário e devolve um token JWT
 *     description: >
 *       Troca email e senha em um token JWT com validade de 1 dia.
 *       Use o botão **authorize** para acessar rotas protegidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             required: [email, senha, perfil, cargo]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'bytes@teste.com'
 *               senha:
 *                 type: string
 *                 example: '123456'  
 *     responses:
 *       200:
 *         description: Login feito com sucesso
 *         content:
 *           application/json:
 *             schemas:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: errYHAUSusfasyttASuiasdIAshd...
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: E-mail ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/login/funcionario', authController.loginFuncionario)

export default router;