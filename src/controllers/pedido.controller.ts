import { Request, Response } from 'express';
import * as pedidoService from '../services/pedido.service';

export async function criar(req: Request, res: Response): Promise<void> {
    const { cliente_id }    = req.body;
    const pedido            = await pedidoService.criarPedido({ cliente_id });
    res.status(201).json(pedido);
}

export async function listar(req:Request, res:Response): Promise<void> {
    const cliente_id    = req.user!.id;
    const pedido        = await pedidoService.listarPedidos(cliente_id);
    
    res.status(200).json(pedido);
}

export async function buscarPorId(req:Request, res:Response): Promise<void> {
    const id        = Number(req.params.id);
    const pedido    = await pedidoService.buscarPedidoPorId(id);

    res.status(200).json(pedido);
}

export async function finalizar(req:Request, res:Response): Promise<void> {
    const id        = Number(req.params.id);
    const pedido    = await pedidoService.finalizarPedido(id);

    res.status(200).json(pedido);
}

export async function cancelar(req:Request, res:Response): Promise<void> {
    const id        = Number(req.params.id);
    const pedido    = await pedidoService.cancelarPedido(id);

    res.status(200).json(pedido);
}
