import { Request, Response } from 'express';
import * as categoriaService from '../services/categoria.service';

export async function criar(req:Request, res: Response): Promise<void> {
    const { nome, descricao } = req.body;
    const categoria = await categoriaService.criarCategoria({ nome, descricao });
    res.status(201).json(categoria);
}

export async function listar(req:Request, res: Response): Promise<void>{
    const categorias = await categoriaService.listarCategoria();
    res.status(200).json(categorias);
}

export async function buscarPorId(req:Request, res: Response): Promise<void>{
    const id = Number(req.params.id);
    const categoria = await categoriaService.buscarCategoriaPorId(id);
    res.status(200).json(categoria);
}

export async function atualizar(req: Request, res: Response): Promise<void>{
    const id = Number(req.params.id);
    const categoria = await categoriaService.AtualizarCategoria(id, req.body);
    res.status(200).json(categoria);
}