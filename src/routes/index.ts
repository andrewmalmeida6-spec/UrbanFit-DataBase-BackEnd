import { Router } from 'express';
import authRoutes from './auth.routes';
import clienteRoutes from './cliente.routes';
import pedidoRoutes from './pedido.routes';
import itemPedidoRoutes from './item_pedido.routes';
import estoqueOpcaoRoutes from './estoque_opcao.routes';
import produtoRoutes from './produto.routes';
import categoriaRoutes from './categoria.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/cliente', clienteRoutes);
routes.use('/pedido', pedidoRoutes)
routes.use('/item', itemPedidoRoutes)
routes.use('/estoque', estoqueOpcaoRoutes);
routes.use('/produto', produtoRoutes);
routes.use('/categoria', categoriaRoutes);

export { routes };