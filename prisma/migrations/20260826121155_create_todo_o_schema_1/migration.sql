-- CreateTable
CREATE TABLE "pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente_id" INTEGER NOT NULL,
    "item_pedido_id" INTEGER NOT NULL,
    "nome_pedido" TEXT NOT NULL,
    "valor_final" DECIMAL NOT NULL,
    "status" TEXT NOT NULL,
    "data_pedido" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_entregue" DATETIME NOT NULL,
    CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "itens pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedido_id" INTEGER NOT NULL,
    "estoque_opcao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DECIMAL NOT NULL,
    CONSTRAINT "itens pedidos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "opções de estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto_id" INTEGER NOT NULL,
    "item_pedido_id" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_sub_total" DECIMAL NOT NULL,
    CONSTRAINT "opções de estoque_item_pedido_id_fkey" FOREIGN KEY ("item_pedido_id") REFERENCES "itens pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria_id" INTEGER NOT NULL,
    "estoque_opcao_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "preco_base" DECIMAL NOT NULL,
    CONSTRAINT "produtos_estoque_opcao_id_fkey" FOREIGN KEY ("estoque_opcao_id") REFERENCES "opções de estoque" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "categorias_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_cliente_id_key" ON "pedidos"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_item_pedido_id_key" ON "pedidos"("item_pedido_id");

-- CreateIndex
CREATE UNIQUE INDEX "itens pedidos_pedido_id_key" ON "itens pedidos"("pedido_id");

-- CreateIndex
CREATE UNIQUE INDEX "itens pedidos_estoque_opcao_key" ON "itens pedidos"("estoque_opcao");

-- CreateIndex
CREATE UNIQUE INDEX "opções de estoque_produto_id_key" ON "opções de estoque"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "opções de estoque_item_pedido_id_key" ON "opções de estoque"("item_pedido_id");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_categoria_id_key" ON "produtos"("categoria_id");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_estoque_opcao_id_key" ON "produtos"("estoque_opcao_id");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_produto_id_key" ON "categorias"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");
