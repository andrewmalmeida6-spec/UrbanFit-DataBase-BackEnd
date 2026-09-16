import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarProduto {
    categoria_id: number;
    nome: string;
    marca: string;
    preco_base: number;
}

interface AtualizarProduto {
    categoria_id?: number;
    nome?: string;
    marca?: string;
    preco_base?: number;
}

export async function criarProduto(dados: CriarProduto){
    const categoria = await prisma.categoria.findUnique({
        where: {id: dados.categoria_id}
    });

    if(!categoria){
        throw new AppError("Categoria não encontrada!", 404)
    }

    const produto = await prisma.produto.create({
        data: dados,
        include: {categoria: true}
    })

    return produto;
}

export async function listarProdutos() {
    const produtos = await prisma.produto.findMany({
        include: {categoria: true},
        orderBy: {id: "asc"}
    })

    return produtos;
}

export async function buscarProdutoPorId(id: number){
    const produtos = await prisma.produto.findUnique({
        where: {id},
        include: {categoria: true}
    })

    if(!produtos){
        throw new AppError("Produto não encontrado!", 404);
    }

    return produtos;
}

export async function atualizarProduto(id: number, dados: AtualizarProduto) {
    await buscarProdutoPorId(id);

    return prisma.produto.update({
        where: {id},
        data: dados,
        include: {categoria: true}
    })
}