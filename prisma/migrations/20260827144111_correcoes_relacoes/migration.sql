/*
  Warnings:

  - Added the required column `produto_id` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto_id" INTEGER NOT NULL,
    "tipo_roupa" TEXT NOT NULL,
    "variacao" TEXT NOT NULL,
    "material" TEXT NOT NULL
);
INSERT INTO "new_categorias" ("id", "material", "tipo_roupa", "variacao") SELECT "id", "material", "tipo_roupa", "variacao" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE UNIQUE INDEX "categorias_produto_id_key" ON "categorias"("produto_id");
CREATE TABLE "new_itens pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedido_id" INTEGER NOT NULL,
    "estoque_opcao_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" REAL NOT NULL,
    CONSTRAINT "itens pedidos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_itens pedidos" ("estoque_opcao_id", "id", "pedido_id", "preco_unitario", "quantidade") SELECT "estoque_opcao_id", "id", "pedido_id", "preco_unitario", "quantidade" FROM "itens pedidos";
DROP TABLE "itens pedidos";
ALTER TABLE "new_itens pedidos" RENAME TO "itens pedidos";
CREATE UNIQUE INDEX "itens pedidos_pedido_id_key" ON "itens pedidos"("pedido_id");
CREATE UNIQUE INDEX "itens pedidos_estoque_opcao_id_key" ON "itens pedidos"("estoque_opcao_id");
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "em_estoque" BOOLEAN NOT NULL,
    "preco_base" REAL NOT NULL
);
INSERT INTO "new_produtos" ("categoria_id", "em_estoque", "id", "marca", "nome", "preco_base") SELECT "categoria_id", "em_estoque", "id", "marca", "nome", "preco_base" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_categoria_id_key" ON "produtos"("categoria_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
