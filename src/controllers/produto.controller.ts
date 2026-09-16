import { Request, Response } from 'express';
import * as produtoService from '../services/produto.service';

export async function criar(req:Request, res: Response): Promise<void>{
    const {categoria_id, nome, marca, preco_base} = req.body;
    const produto = await produtoService.criarProduto({categoria_id, nome, marca, preco_base});
    res.status(201).json(produto);
}

export async function listar(req: Request, res: Response): Promise<void>{
    const produtos = await produtoService.listarProdutos();
    res.status(200).json(produtos);
}

export async function buscarPorId(req: Request, res: Response): Promise<void>{
    const id = Number(req.params.id);
    const produto = await produtoService.buscarProdutoPorId(id);
    res.status(200).json(produto)
}

export async function atualizar(req:Request, res: Response): Promise<void>{
    const id = Number(req.params.id);
    const produto = await produtoService.atualizarProduto(id, req.body);
    res.status(200).json(produto);
}