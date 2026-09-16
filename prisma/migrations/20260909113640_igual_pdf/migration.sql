/*
  Warnings:

  - You are about to drop the column `quantidade` on the `opções de estoque` table. All the data in the column will be lost.
  - You are about to drop the column `data_estimada_entrega` on the `pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `data_real_entrega` on the `pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `em_estoque` on the `produtos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_opções de estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto_id" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "opções de estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_opções de estoque" ("cor", "id", "produto_id", "tamanho") SELECT "cor", "id", "produto_id", "tamanho" FROM "opções de estoque";
DROP TABLE "opções de estoque";
ALTER TABLE "new_opções de estoque" RENAME TO "opções de estoque";
CREATE TABLE "new_pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente_id" INTEGER NOT NULL,
    "valor_final" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "data_pedido" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("cliente_id", "data_pedido", "id", "status", "valor_final") SELECT "cliente_id", "data_pedido", "id", "status", "valor_final" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "preco_base" REAL NOT NULL,
    CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("categoria_id", "id", "marca", "nome", "preco_base") SELECT "categoria_id", "id", "marca", "nome", "preco_base" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
