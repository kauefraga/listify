import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';

export function createServer() {
  const http = fastify({
    logger: true,
  });

  http.register(helmet);
  http.register(cors);

  return http;
}

type ServerContext = ReturnType<typeof createServer>;

export type Controller = (http: ServerContext) => void;

export function defineRoutes(http: ServerContext, controllers: Controller[]) {
  for (const controller of controllers) {
    controller(http);
  }
}
