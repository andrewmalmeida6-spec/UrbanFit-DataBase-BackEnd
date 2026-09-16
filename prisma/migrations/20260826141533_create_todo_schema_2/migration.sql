/*
  Warnings:

  - You are about to alter the column `preco_unitario` on the `itens pedidos` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `preco_sub_total` on the `opções de estoque` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to drop the column `data_entregue` on the `pedidos` table. All the data in the column will be lost.
  - You are about to alter the column `valor_final` on the `pedidos` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `preco_base` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - Added the required column `data_estimada_entrega` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_itens pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedido_id" INTEGER NOT NULL,
    "estoque_opcao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" REAL NOT NULL,
    CONSTRAINT "itens pedidos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_itens pedidos" ("estoque_opcao", "id", "pedido_id", "preco_unitario", "quantidade") SELECT "estoque_opcao", "id", "pedido_id", "preco_unitario", "quantidade" FROM "itens pedidos";
DROP TABLE "itens pedidos";
ALTER TABLE "new_itens pedidos" RENAME TO "itens pedidos";
CREATE UNIQUE INDEX "itens pedidos_pedido_id_key" ON "itens pedidos"("pedido_id");
CREATE UNIQUE INDEX "itens pedidos_estoque_opcao_key" ON "itens pedidos"("estoque_opcao");
CREATE TABLE "new_opções de estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto_id" INTEGER NOT NULL,
    "item_pedido_id" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_sub_total" REAL NOT NULL,
    CONSTRAINT "opções de estoque_item_pedido_id_fkey" FOREIGN KEY ("item_pedido_id") REFERENCES "itens pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_opções de estoque" ("cor", "id", "item_pedido_id", "preco_sub_total", "produto_id", "quantidade", "tamanho") SELECT "cor", "id", "item_pedido_id", "preco_sub_total", "produto_id", "quantidade", "tamanho" FROM "opções de estoque";
DROP TABLE "opções de estoque";
ALTER TABLE "new_opções de estoque" RENAME TO "opções de estoque";
CREATE UNIQUE INDEX "opções de estoque_produto_id_key" ON "opções de estoque"("produto_id");
CREATE UNIQUE INDEX "opções de estoque_item_pedido_id_key" ON "opções de estoque"("item_pedido_id");
CREATE TABLE "new_pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente_id" INTEGER NOT NULL,
    "item_pedido_id" INTEGER NOT NULL,
    "nome_pedido" TEXT NOT NULL,
    "valor_final" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "data_pedido" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_estimada_entrega" DATETIME NOT NULL,
    "data_real_entrega" DATETIME,
    CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("cliente_id", "data_pedido", "id", "item_pedido_id", "nome_pedido", "status", "valor_final") SELECT "cliente_id", "data_pedido", "id", "item_pedido_id", "nome_pedido", "status", "valor_final" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
CREATE UNIQUE INDEX "pedidos_cliente_id_key" ON "pedidos"("cliente_id");
CREATE UNIQUE INDEX "pedidos_item_pedido_id_key" ON "pedidos"("item_pedido_id");
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria_id" INTEGER NOT NULL,
    "estoque_opcao_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "preco_base" REAL NOT NULL,
    CONSTRAINT "produtos_estoque_opcao_id_fkey" FOREIGN KEY ("estoque_opcao_id") REFERENCES "opções de estoque" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("categoria_id", "estoque_opcao_id", "id", "marca", "nome", "preco_base") SELECT "categoria_id", "estoque_opcao_id", "id", "marca", "nome", "preco_base" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_categoria_id_key" ON "produtos"("categoria_id");
CREATE UNIQUE INDEX "produtos_estoque_opcao_id_key" ON "produtos"("estoque_opcao_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
