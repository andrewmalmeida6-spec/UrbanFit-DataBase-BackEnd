import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarCategoria {
    nome:       string;
    descricao:  string;
}

interface AtualizarCategoria {
    nome?:      string;
    descricao?: string;
}

export async function criarCategoria(dados: CriarCategoria) {
    const categoria = await prisma.categoria.create({
        data: dados
    })

    return categoria;
}

export async function listarCategoria() {
    const categorias = await prisma.categoria.findMany({
        orderBy: {id: "asc"}
    })

    return categorias;
}

export async function buscarCategoriaPorId(id: number) {
    const categoria = await prisma.categoria.findUnique({
        where: {id}
    })

    if(!categoria){
        throw new AppError('Categoria não encontrada', 404);
    }

    return categoria;
}

export async function AtualizarCategoria(id:number, dados: AtualizarCategoria) {
    await buscarCategoriaPorId(id);

    return prisma.categoria.update({
        where: {id},
        data: dados
    })
}