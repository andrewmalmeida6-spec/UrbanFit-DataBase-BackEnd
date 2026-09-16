/*
  Warnings:

  - You are about to drop the column `material` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_roupa` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `variacao` on the `categorias` table. All the data in the column will be lost.
  - You are about to alter the column `estoque_opcao_id` on the `itens pedidos` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `item_pedido_id` on the `opções de estoque` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);
INSERT INTO "new_categorias" ("id") SELECT "id" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE TABLE "new_itens pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedido_id" INTEGER NOT NULL,
    "estoque_opcao_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" REAL NOT NULL,
    CONSTRAINT "itens pedidos_estoque_opcao_id_fkey" FOREIGN KEY ("estoque_opcao_id") REFERENCES "opções de estoque" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "itens pedidos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_itens pedidos" ("estoque_opcao_id", "id", "pedido_id", "preco_unitario", "quantidade") SELECT "estoque_opcao_id", "id", "pedido_id", "preco_unitario", "quantidade" FROM "itens pedidos";
DROP TABLE "itens pedidos";
ALTER TABLE "new_itens pedidos" RENAME TO "itens pedidos";
CREATE UNIQUE INDEX "itens pedidos_pedido_id_key" ON "itens pedidos"("pedido_id");
CREATE UNIQUE INDEX "itens pedidos_estoque_opcao_id_key" ON "itens pedidos"("estoque_opcao_id");
CREATE TABLE "new_opções de estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto_id" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_sub_total" REAL NOT NULL,
    CONSTRAINT "opções de estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_opções de estoque" ("cor", "id", "preco_sub_total", "produto_id", "quantidade", "tamanho") SELECT "cor", "id", "preco_sub_total", "produto_id", "quantidade", "tamanho" FROM "opções de estoque";
DROP TABLE "opções de estoque";
ALTER TABLE "new_opções de estoque" RENAME TO "opções de estoque";
CREATE UNIQUE INDEX "opções de estoque_produto_id_key" ON "opções de estoque"("produto_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
