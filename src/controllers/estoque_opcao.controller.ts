import { Request, Response } from 'express';
import * as estoqueOpcaoService from '../services/estoque_opcao.service';

export async function criar(req: Request, res: Response): Promise<void> {
    const { produto_id, cor, tamanho, quantidade_estoque } = req.body;
    const produto = await estoqueOpcaoService.criarEstoqueOpcao({ produto_id, cor, tamanho, quantidade_estoque });
    res.status(201).json(produto);
}

export async function listar(req: Request, res: Response): Promise<void> {
    const produto = await estoqueOpcaoService.listarEstoqueOpcao();
    res.status(200).json(produto);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const produto = await estoqueOpcaoService.buscarEstoqueOpcaoPorId(id);
    res.status(200).json(produto);
}

export async function atualizar(req:Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const produto = await estoqueOpcaoService.atualizarEstoqueOpcao(id, req.body);
    res.status(200).json(produto)
}