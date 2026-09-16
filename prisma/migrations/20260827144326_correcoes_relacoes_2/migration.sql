/*
  Warnings:

  - You are about to drop the column `produto_id` on the `categorias` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo_roupa" TEXT NOT NULL,
    "variacao" TEXT NOT NULL,
    "material" TEXT NOT NULL
);
INSERT INTO "new_categorias" ("id", "material", "tipo_roupa", "variacao") SELECT "id", "material", "tipo_roupa", "variacao" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "em_estoque" BOOLEAN NOT NULL,
    "preco_base" REAL NOT NULL,
    CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("categoria_id", "em_estoque", "id", "marca", "nome", "preco_base") SELECT "categoria_id", "em_estoque", "id", "marca", "nome", "preco_base" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_categoria_id_key" ON "produtos"("categoria_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
