import { Request, Response } from "express";
import * as funcionarioService from '../services/funcionario.service';

export async function criar(req: Request, res: Response): Promise<void> {
    const { nome, email, senha, cargo } = req.body;
    const funcionario = await funcionarioService.criarFuncionario({nome, email, senha, cargo});

    res.status(201).json(funcionario)
}

export async function listar(req: Request, res: Response): Promise<void> {
    const funcionario = await funcionarioService.listarFuncionarios();

    res.status(200).json(funcionario);
}

export async function buscarPorID(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const funcionario = await funcionarioService.buscarFuncionarioPorID(id);

    res.status(200).json(funcionario);
}