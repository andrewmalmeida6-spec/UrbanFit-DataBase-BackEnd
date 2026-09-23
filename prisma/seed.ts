import bcrypt from 'bcryptjs';
import { prisma } from '../src/config/prisma';

async function main() {
    console.log('Iniciando criação dados...\n')

    const categoriasExistentes = await prisma.categoria.count();
    if (categoriasExistentes > 0) {
        console.log("O banco já foi populado")
        return;
    }

    //CATEGORIAS
    const camisa = await prisma.categoria.create({
        data: {nome: "Camisa", descricao: "Camisas"}
    })
    console.log("Categoria |Camisa| criada...")

    const calca = await prisma.categoria.create({
        data: {nome: "Calça", descricao: "Calças"}
    })
    console.log("Categoria |Calça| criada...")

    const casaco = await prisma.categoria.create({
        data: {nome: "Casaco", descricao: "Casaco"}
    })
    console.log("Categoria |Casaco| criada...")

    console.log("Categorias criadas")

    //PRODUTOS
    await prisma.produto.createMany({
        data: [
            {categoria_id: camisa.id, nome: "Tech T-shirt", marca: "Nike", preco_base: 5000},
            {categoria_id: camisa.id, nome: "Camisa comum", marca: "Nike", preco_base: 3000},
            {categoria_id: calca.id, nome: "Jeans rasgada", marca: "Sei la Roupas", preco_base: 180},
            {categoria_id: calca.id, nome: "Jeans comum", marca: "Sei la Roupas", preco_base: 100},
            {categoria_id: casaco.id, nome: "Casaco de inverno", marca: "Sem Ideia Roupas ltda", preco_base: 180}
        ]
    });
    console.log("5 Roupas criadas [4 disponíveis, 1 sem estoque]");

    //OPÇÕES DE ESTOQUE
    await prisma.estoqueOpcao.createMany({
        data: [
            {produto_id: 1, cor: "Amarela", tamanho: "G", quantidade_estoque:1},
            {produto_id: 2, cor: "Azul", tamanho: "M", quantidade_estoque:2},
            {produto_id: 3, cor: "Verde", tamanho: "P", quantidade_estoque:2},
            {produto_id: 4, cor: "Vermelho", tamanho: "GG", quantidade_estoque:2},
            {produto_id: 5, cor: "Preto", tamanho: "M", quantidade_estoque:2}
        ]
    });

    console.log("5 opções de estoque criadas");
    
    const adm = await prisma.funcionario.findFirst({
        where: {cargo: 'administrador'}
    })
    if (adm) {
        console.log("Administrador já existe");
        return;
    }

    const senhaHashFuncionario = await bcrypt.hash('adm123', 10)
    await prisma.funcionario.create({
        data: {nome: 'Ademir', email: 'adm@teste.com', senha: senhaHashFuncionario, cargo: 'administrador'}
    })

    //CLIENTES
    const senhaHash = await bcrypt.hash('101010', 10);
     await prisma.cliente.create({
        data: {
            nome: 'Senhorita Bytes',
            cpf: '10011101100',
            email: 'bytesb@teste.com',
            senha: senhaHash,
            telefone: '11000000000',
    },
  });
  console.log('Cliente de teste criado (email: cliente@teste.com, senha: 101010).');

  console.log('Seed concluído com sucesso!');
}

main()
    .catch((erro) => {
        console.error("Seed falhou!");
    })
    .finally(async () => {
        await prisma.$disconnect
    })