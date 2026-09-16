/*
  Warnings:

  - You are about to drop the column `preco_sub_total` on the `opções de estoque` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_opções de estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto_id" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "opções de estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_opções de estoque" ("cor", "id", "produto_id", "quantidade", "tamanho") SELECT "cor", "id", "produto_id", "quantidade", "tamanho" FROM "opções de estoque";
DROP TABLE "opções de estoque";
ALTER TABLE "new_opções de estoque" RENAME TO "opções de estoque";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
