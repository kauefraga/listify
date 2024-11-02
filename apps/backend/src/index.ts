import { createServer, defineRoutes } from './server';

const server = createServer();

defineRoutes(server);

server.listen({ port: 3333 }).catch(reason => console.error(reason));
