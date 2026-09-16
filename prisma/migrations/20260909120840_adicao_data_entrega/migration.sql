/*
  Warnings:

  - Added the required column `data_entrega` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente_id" INTEGER NOT NULL,
    "valor_final" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "data_pedido" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_entrega" DATETIME NOT NULL,
    CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("cliente_id", "data_pedido", "id", "status", "valor_final") SELECT "cliente_id", "data_pedido", "id", "status", "valor_final" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
