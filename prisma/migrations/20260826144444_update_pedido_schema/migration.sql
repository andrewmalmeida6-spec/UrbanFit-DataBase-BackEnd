/*
  Warnings:

  - You are about to drop the column `nome_pedido` on the `pedidos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente_id" INTEGER NOT NULL,
    "item_pedido_id" INTEGER NOT NULL,
    "valor_final" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "data_pedido" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_estimada_entrega" DATETIME NOT NULL,
    "data_real_entrega" DATETIME,
    CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("cliente_id", "data_estimada_entrega", "data_pedido", "data_real_entrega", "id", "item_pedido_id", "status", "valor_final") SELECT "cliente_id", "data_estimada_entrega", "data_pedido", "data_real_entrega", "id", "item_pedido_id", "status", "valor_final" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
CREATE UNIQUE INDEX "pedidos_cliente_id_key" ON "pedidos"("cliente_id");
CREATE UNIQUE INDEX "pedidos_item_pedido_id_key" ON "pedidos"("item_pedido_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
