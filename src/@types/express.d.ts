import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        perfil: 'cliente' | 'funcionario'
        cargo?: string
      };
    }
  }
}