import { createServer, defineRoutes } from './server';
import { UserController } from './user/user.controller';

const server = createServer();

defineRoutes(server, [UserController]);

console.log(':> Server running at http://localhost:3333/');
server.listen({ port: 3333 }).catch(reason => console.error('error :>', reason));
