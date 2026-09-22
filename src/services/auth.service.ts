import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface LoginInput {
  email: string;
  senha: string;
  perfil: 'cliente' | 'funcionario'
  cargo?: string
}

export async function loginCliente(dados: LoginInput) {

  const cliente         = await prisma.cliente.findUnique({ where: { email: dados.email } });
  const senhaConfere    = await bcrypt.compare(dados.senha, cliente?.senha ?? '');

  if (!cliente || !senhaConfere) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    { id: cliente.id, email: cliente.email, perfil: 'cliente' },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
  );

  return {
    token,
    cliente: { id: cliente.id, nome: cliente.nome, email: cliente.email },
  };
}

export async function loginFuncionario(dados: LoginInput) {

  const funcionario     = await prisma.funcionario.findUnique({ where: { email: dados.email } });
  const senhaConfere    = await bcrypt.compare(dados.senha, funcionario?.senha ?? '');

  if (!funcionario || !senhaConfere) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    { id: funcionario.id, email: funcionario.email, perfil: 'funcionario', cargo: funcionario.cargo },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
  );

  return {
    token,
    funcionario: { id: funcionario.id, nome: funcionario.nome, email: funcionario.email, cargo: funcionario.cargo },
  };
}