import 'express-async-errors';

import SwaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import express from "express";
import cors from "cors";
import { routes } from './routes';
import { errorHandler } from './middlewares/error.middleware';;

const app = express();;

app.use(cors());
app.use(express.json());

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
    res.json(swaggerSpec)
});

app.use('/api', routes);
app.get("/", (req, res) => {
    res.json({mensagem: "Olá, Mundo!"})
});

app.use(errorHandler);

export {app};