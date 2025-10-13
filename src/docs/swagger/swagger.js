import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from '../../config/config.js';

// Definición básica de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API del Proyecto Backend - E-commerce',
    version: '1.0.0',
    description: 'API completa para sistema de e-commerce con autenticación, gestión de productos, carrito de compras y órdenes',
    contact: {
      name: 'Equipo de Desarrollo',
      email: 'dev@example.com'
    }
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}`,
      description: 'Servidor de desarrollo'
    },
    {
      url: 'https://api.proyecto-backend.com',
      description: 'Servidor de producción'
    }
  ],
  security: [
    {
      bearerAuth: []
    },
    {
      cookieAuth: []
    }
  ]
};

// Opciones para swagger-jsdoc - solo archivos YAML
const options = {
  definition: swaggerDefinition,
  apis: [
    './src/docs/swagger/paths/*.yaml',
    './src/docs/swagger/schemas/*.yaml'
  ]
};

// Generar la especificación de Swagger
const specs = swaggerJsdoc(options);

// Configurar Swagger UI
const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Documentation - Proyecto Backend'
};

export { specs, swaggerUi, swaggerOptions };