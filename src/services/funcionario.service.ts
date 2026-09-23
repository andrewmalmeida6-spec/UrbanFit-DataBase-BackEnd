import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';
import bcrypt from 'bcryptjs';

const SELECT_FUNCIONARIO_PUBLICO = {
    nome: true,
    email: true,
    cargo: true
} as const

interface dadosFuncionario {
    nome: string
    email: string
    senha: string
    cargo: string
}

export async function criarFuncionario(dados:dadosFuncionario) {
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    if (dados.cargo === 'administrador') {
        throw new AppError('Você não pode criar administrador')
    }

    const funcionario = await prisma.funcionario.create({
        data: {...dados, senha: senhaHash},
        select: SELECT_FUNCIONARIO_PUBLICO
    })

    return funcionario;
}

export async function listarFuncionarios() {
    const funcionarios = await prisma.funcionario.findMany({
        select: SELECT_FUNCIONARIO_PUBLICO,
        orderBy: {id: 'asc'}
    })

    return funcionarios;
}

export async function buscarFuncionarioPorID(id: number) {
    const funcionario = await prisma.funcionario.findUnique({
        where: {id},
        select: SELECT_FUNCIONARIO_PUBLICO
    })

    if (!funcionario) {
        throw new AppError('Funcionário não encontrado', 404);
    }

    return funcionario;
}