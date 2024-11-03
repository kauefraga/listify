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

export function defineRoutes(http: ReturnType<typeof createServer>) {
  http.get('/', () => {
    return { message: 'Welcome to Listify :)' };
  });
}
