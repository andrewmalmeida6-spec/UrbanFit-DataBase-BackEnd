/*
  Warnings:

  - You are about to drop the column `produto_id` on the `categorias` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);
INSERT INTO "new_categorias" ("descricao", "id", "nome") SELECT "descricao", "id", "nome" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria_id" INTEGER NOT NULL,
    "estoque_opcao_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "em_estoque" BOOLEAN NOT NULL,
    "preco_base" REAL NOT NULL,
    CONSTRAINT "produtos_estoque_opcao_id_fkey" FOREIGN KEY ("estoque_opcao_id") REFERENCES "opções de estoque" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("categoria_id", "em_estoque", "estoque_opcao_id", "id", "marca", "nome", "preco_base") SELECT "categoria_id", "em_estoque", "estoque_opcao_id", "id", "marca", "nome", "preco_base" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_categoria_id_key" ON "produtos"("categoria_id");
CREATE UNIQUE INDEX "produtos_estoque_opcao_id_key" ON "produtos"("estoque_opcao_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
