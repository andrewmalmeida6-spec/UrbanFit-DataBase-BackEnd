import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';

type Perfil = 'cliente' | 'funcionario'

interface TokenPayload {
  id:     number;
  email:  string;
  perfil: Perfil
  cargo?: string
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não fornecido.', 401);
  }

  const partes = authHeader.split(' ');

  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    throw new AppError('Token mal formatado. Utilize o formato: Bearer <token>.', 401);
  }

  const token = partes[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    req.user = { id: payload.id, email: payload.email, perfil: payload.perfil, cargo: payload.cargo };
  } catch {
    
    throw new AppError('Token inválido ou expirado.', 401);
  }

  next();
}

export function autorizar(...perfisPermitidos: Perfil[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Usuário não autenticado!", 401);
    }

    if (!perfisPermitidos.includes(req.user.perfil)) {
      throw new AppError('Você não tem permissão para estar aqui.', 403);
    }

    next();
  }
}

export function autorizarCargo(cargosPermitidos: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Usuário não autenticado!", 401);
    }

    if (req.user.perfil !== "funcionario") {
      throw new AppError("Sem autorização para esta função", 403);
    }

    if (req.user.cargo !== cargosPermitidos) {
      throw new AppError("Sem autorização para esta função", 403);
    }

    next();
  }
}
