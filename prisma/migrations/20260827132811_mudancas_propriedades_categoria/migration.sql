/*
  Warnings:

  - You are about to drop the column `descricao` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `categorias` table. All the data in the column will be lost.
  - Added the required column `material` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_roupa` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variacao` to the `categorias` table without a default value. This is not possible if the table is not empty.

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
INSERT INTO "new_categorias" ("id") SELECT "id" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
