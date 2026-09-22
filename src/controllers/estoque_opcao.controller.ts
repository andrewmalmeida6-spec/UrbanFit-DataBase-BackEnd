import { Request, Response } from 'express';
import * as estoqueOpcaoService from '../services/estoque_opcao.service';

export async function criar(req: Request, res: Response): Promise<void> {
    const { produto_id, cor, tamanho, quantidade_estoque }  = req.body;
    const produto                                           = await estoqueOpcaoService.criarEstoqueOpcao({ produto_id, cor, tamanho, quantidade_estoque });

    res.status(201).json(produto);
}

export async function listar(req: Request, res: Response): Promise<void> {
    const produto = await estoqueOpcaoService.listarEstoqueOpcao();

    res.status(200).json(produto);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
    const id        = Number(req.params.id);
    const produto   = await estoqueOpcaoService.buscarEstoqueOpcaoPorId(id);

    res.status(200).json(produto);
}

export async function adicionar(req:Request, res: Response): Promise<void> {
    const id        = Number(req.params.id);
    const produto   = await estoqueOpcaoService.deletarEstoque(id);

    res.status(200).json(produto)
}

export async function remover(req:Request, res: Response): Promise<void> {
    const id            = Number(req.params.id);
    const quantidade    = Number(req.params.quantidade);
    const produto       = await estoqueOpcaoService.removerEstoque(id, quantidade);

    res.status(200).json(produto)
}

export async function deletar(req:Request, res: Response): Promise<void> {
    const id        = Number(req.params.id);
    const produto   = await estoqueOpcaoService.deletarEstoque(id);
    
    res.status(200).json(produto)
}