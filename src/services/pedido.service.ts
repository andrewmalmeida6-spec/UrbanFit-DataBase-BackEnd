import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware'

interface dadosPedido {
    cliente_id:number
}

export async function criarPedido(dados:dadosPedido) {
    return prisma.$transaction(async (tx) => {
        let valor_final:number = 0;

        const cliente = await tx.cliente.findUnique({
            where: {id: dados.cliente_id}
        })

        if (!cliente) {
            throw new AppError("Cliente não encontrado", 404)
        }

        const pedido = await tx.pedido.create({ 
            data: {...dados, status:"PENDENTE", valor_final},
            include: {cliente:true}
        })

        return pedido;
    }) 
}

export async function listarPedidos(cliente_id:number) {
    const pedido = await prisma.pedido.findMany({ 
        where: {id: cliente_id},
        include: {cliente:true} 
    })

    return pedido;
}

export async function buscarPedidoPorId(id:number) {
    const pedido = await prisma.pedido.findUnique({
        where: {id},
        include: {cliente:true}
    })

    if (!pedido) {
        throw new AppError("Cliente não encontrado", 404)
    }

    return pedido;
}

export async function finalizarPedido(id:number) {
    await buscarPedidoPorId(id)

    return prisma.pedido.update({
        where: {id},
        data: {status:"FINALIZADO"},
        include: {cliente:true}
    })
}

export async function cancelarPedido(id:number) {
    await buscarPedidoPorId(id)

    return prisma.pedido.update({
        where: {id},
        data: {status:"CANCELADO"},
        include: {cliente:true}
    })
}