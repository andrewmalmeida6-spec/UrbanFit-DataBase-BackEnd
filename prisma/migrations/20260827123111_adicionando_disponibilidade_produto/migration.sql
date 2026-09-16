/*
  Warnings:

  - Added the required column `em_estoque` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria_id" INTEGER NOT NULL,
    "estoque_opcao_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "em_estoque" BOOLEAN NOT NULL,
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
