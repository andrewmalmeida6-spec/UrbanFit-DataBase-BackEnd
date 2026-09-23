import { Request, Response } from 'express';
import * as itemPedidoService from '../services/item_pedido.service';

export async function criar(req: Request, res: Response): Promise<void> {
    const { pedido_id, estoque_opcao_id, quantidade } = req.body;
    const cliente_id = req.user!.id;
    const item_pedido = await itemPedidoService.criarItem(
        {
            pedido_id, 
            estoque_opcao_id, 
            quantidade
        }, cliente_id);

    res.status(201).json(item_pedido);
}

export async function listar(req: Request, res: Response): Promise<void> {
    const pedido_id     = Number(req.params.id);
    const item_pedido   = await itemPedidoService.listarItem(pedido_id);

    res.status(200).json(item_pedido);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
    const id            = Number(req.params.id);
    const item_pedido   = await itemPedidoService.buscarItemPorId(id);

    res.status(200).json(item_pedido);
}

export async function adicionar(req: Request, res: Response): Promise<void> {
    const id            = Number(req.params.id);
    const cliente_id    = req.user!.id;
    const quantidade    = Number(req.params.quantidade);
    const item_pedido   = await itemPedidoService.adicionarItens(id, quantidade, cliente_id);
    
    res.status(200).json(item_pedido);
}

export async function remover(req: Request, res: Response): Promise<void> {
    const id            = Number(req.params.id);
    const cliente_id    = req.user!.id;
    const quantidade    = Number(req.params.quantidade);
    const item_pedido   = await itemPedidoService.removerItens(id, quantidade, cliente_id);

    res.status(200).json(item_pedido);
}

export async function deletar(req: Request, res: Response): Promise<void> {
    const id            = Number(req.params.id);
    const cliente_id    = req.user!.id;
    const item_pedido   = await itemPedidoService.deletarItem(id, cliente_id);

    res.status(200).json(item_pedido);
}