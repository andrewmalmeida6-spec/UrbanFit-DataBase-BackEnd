import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function loginCliente(req: Request, res: Response): Promise<Response> {
  const { email, senha, perfil }  = req.body;
  const resultado         = await authService.loginCliente({ email, senha, perfil });

  return res.status(200).json(resultado);
}

export async function loginFuncionario(req: Request, res: Response): Promise<Response> {
  const { email, senha, perfil, cargo }  = req.body;
  const resultado         = await authService.loginFuncionario({ email, senha, perfil, cargo });

  return res.status(200).json(resultado);
}