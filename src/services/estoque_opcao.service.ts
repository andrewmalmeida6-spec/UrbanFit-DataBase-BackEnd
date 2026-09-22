import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarEstoqueOpcao {
    produto_id:             number;
    cor:                    string;
    tamanho:                string;
    quantidade_estoque:     number;
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

export async function adicionarEstoque(id:number, quantidade:number) {
    return prisma.$transaction(async (tx) => {
        const estoque = await tx.estoqueOpcao.findUnique({
            where: {id}
        })

        if (!estoque) {
            throw new AppError("Opção de estoque não encontrada", 404)
        }

        if (quantidade <= 0) {
            throw new AppError("Não pode adicionar uma quantidade negativa", 403)
        } else {
            await tx.estoqueOpcao.update({
                where: {id: estoque.id},
                data: {quantidade_estoque: { increment: quantidade}}
            })
        }
        }
    )
}

export async function removerEstoque(id:number, quantidade:number) {
    return prisma.$transaction(async (tx) => {
        const estoque = await tx.estoqueOpcao.findUnique({
            where: {id}
        })

        if (!estoque) {
            throw new AppError("Opção de estoque não encontrada", 404)
        }

        if (quantidade > estoque.quantidade_estoque) {
            throw new AppError("Para remover todos os itens do estoque, use a função de deletar", 403)
        } 
        else if (quantidade > 0) {
            throw new AppError("Não pode remover uma quantidade negativa", 403)
        } 
        else {
            await tx.estoqueOpcao.update({
                where: {id: estoque.id},
                data: {quantidade_estoque: { decrement: quantidade}}
            })
        }
        }
    )
}

export async function deletarEstoque(id:number) {
    return prisma.$transaction(async (tx) => {
        const estoque = await tx.estoqueOpcao.findUnique({
            where: {id}
        })

        if (!estoque) {
            throw new AppError("Item não encontrado", 404)
        }

        await tx.estoqueOpcao.delete({
            where: {id}
        })
    })
}