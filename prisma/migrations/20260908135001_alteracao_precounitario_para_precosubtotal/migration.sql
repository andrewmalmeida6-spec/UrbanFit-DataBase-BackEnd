/*
  Warnings:

  - You are about to drop the column `preco_unitario` on the `itens pedidos` table. All the data in the column will be lost.
  - Added the required column `preco_sub_total` to the `itens pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_itens pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedido_id" INTEGER NOT NULL,
    "estoque_opcao_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_sub_total" REAL NOT NULL,
    CONSTRAINT "itens pedidos_estoque_opcao_id_fkey" FOREIGN KEY ("estoque_opcao_id") REFERENCES "opções de estoque" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "itens pedidos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_itens pedidos" ("estoque_opcao_id", "id", "pedido_id", "quantidade") SELECT "estoque_opcao_id", "id", "pedido_id", "quantidade" FROM "itens pedidos";
DROP TABLE "itens pedidos";
ALTER TABLE "new_itens pedidos" RENAME TO "itens pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
