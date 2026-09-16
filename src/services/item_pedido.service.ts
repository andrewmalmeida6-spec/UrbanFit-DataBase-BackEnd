import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface dadosItem {
    pedido_id: number;
    estoque_opcao_id: number;
    quantidade: number;
}

export async function criarItem(dados:dadosItem) {
    return prisma.$transaction(async (tx) => {
        const estoque_opcao = await tx.estoqueOpcao.findUnique({
            where: {id: dados.estoque_opcao_id},
            include:  {produto:true}
        });

        if(!estoque_opcao){
            throw new AppError("Produto não encontrado!", 404); 
        }

        const pedido = await tx.pedido.findUnique({
            where: {id: dados.pedido_id}
        })

        if(!pedido){
            throw new AppError("Pedido não encontrado!", 404); 
        }

        if(pedido.status === "FINALIZADO" || pedido.status === "CANCELADO"){
            throw new AppError("Pedido já finalizado", 403)
        }

        let preco_sub_total:number = estoque_opcao.produto.preco_base * dados.quantidade;

        const item_pedido = await tx.itemPedido.create({
            data: {...dados, preco_sub_total},
            include: {estoque_opcao: true, pedido:true}
        });

        await tx.pedido.update({
            where: {id: pedido.id},
            data: {valor_final: {
                increment: preco_sub_total
            }}
        })

        return item_pedido;
    }) 
} 

export async function listarItem() {
    const item_pedido = await prisma.itemPedido.findMany({
        include: {estoque_opcao: true, pedido:true},
        orderBy: {id: "asc"}
    })

    return item_pedido;
}

export async function buscarItemPorId(id: number) {
    const item_pedido = await prisma.itemPedido.findUnique({
        where: {id},
        include: {estoque_opcao: true, pedido:true}
    })

    if(!item_pedido) {
        throw new AppError("Item não encontrado!", 404)
    }

    return item_pedido;
}

export async function adicionarItens(id:number, quantidade:number) {
    return prisma.$transaction(async (tx) => {
        const item = await tx.itemPedido.findUnique({
            where: {id}
        })

        if (!item) {
            throw new AppError("Item não encontrado", 404)
        }

        const valor_unitario = item.preco_sub_total/item.quantidade

        if (quantidade <= 0) {
            throw new AppError("Não pode adicionar uma quantidade negativa", 403)
        } else {
            await tx.pedido.update({
                where: {id: item.pedido_id},
                data: {valor_final: { increment: valor_unitario * quantidade}}
            })

            await tx.itemPedido.update({
                where: {id},
                data: {quantidade: {increment: quantidade},
                        preco_sub_total: {increment: valor_unitario * quantidade}}
            })
        }
        }
    )
}

export async function removerItens(id:number, quantidade:number) {
    return prisma.$transaction(async (tx) => {
        const item = await tx.itemPedido.findUnique({
            where: {id}
        })

        if (!item) {
            throw new AppError("Item não encontrado", 404)
        }

        const valor_unitario = item.preco_sub_total/item.quantidade

        if (quantidade > item.quantidade) {
            throw new AppError("Para retirar um item, use a função de deletar", 403)
        } else {
            await tx.pedido.update({
                where: {id: item.pedido_id},
                data: {valor_final: { decrement: valor_unitario * quantidade}}
            })

            await tx.itemPedido.update({
                where: {id},
                data: {quantidade: {decrement: quantidade},
                        preco_sub_total: {decrement: valor_unitario * quantidade}}
            })
        } 
    })
}

export async function deletarItem(id:number) {
    return prisma.$transaction(async (tx) => {
        const item = await tx.itemPedido.findUnique({
            where: {id}
        })

        if (!item) {
            throw new AppError("Item não encontrado", 404)
        }

        await tx.pedido.update({
            where: {id: item.pedido_id},
            data: {valor_final: {decrement: item.preco_sub_total}}
        })

        await tx.itemPedido.delete({
            where: {id}
        })
    })
}