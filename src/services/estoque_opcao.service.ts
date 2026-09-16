import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarEstoqueOpcao {
    produto_id: number;
    cor: string;
    tamanho: string;
    quantidade_estoque: number;
}

interface AtualizarEstoqueOpcao {
    produto_id?: number;
    cor?: string;
    tamanho?: string;
    quantidade_estoque?: number;
}

export async function criarEstoqueOpcao(dados:CriarEstoqueOpcao) {
    const produto = await prisma.produto.findUnique({
        where: {id: dados.produto_id}
    });

    

    if(!produto){
        throw new AppError("Produto não encontrado!", 404); 
    }

    const estoque_opcao = await prisma.estoqueOpcao.create({
        data: dados,
        include: {produto: true}
    });

    return estoque_opcao;
}

export async function listarEstoqueOpcao() {
    const estoque_opcao = await prisma.estoqueOpcao.findMany({
        include: {produto: true},
        orderBy: {id: "asc"}
    })

    return estoque_opcao;
}

export async function buscarEstoqueOpcaoPorId(id: number) {
    const estoque_opcao = prisma.estoqueOpcao.findUnique({
        where: {id},
        include: {produto: true}
    })

    if(!estoque_opcao) {
        throw new AppError("Opção de estoque não encontrado!", 404)
    }

    return estoque_opcao;
}

export async function atualizarEstoqueOpcao(id:number, dados: AtualizarEstoqueOpcao){
    await buscarEstoqueOpcaoPorId(id)

    return prisma.estoqueOpcao.update({
        where: {id},
        data: dados,
        include: {produto: true}
    })
}