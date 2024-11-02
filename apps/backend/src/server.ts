import Fastify from 'fastify';

export function createServer() {
  const http = Fastify({
    logger: true,
  });

  return http;
}

export function defineRoutes(http: ReturnType<typeof createServer>) {
  http.get('/', () => {
    return { message: 'Welcome to Listify :)' };
  });
}
