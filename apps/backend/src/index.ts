import { ListController } from './list/list.controller';
import { TagController } from './list/tag.controller';
import { createServer, defineRoutes } from './server';
import { UserController } from './user/user.controller';

const server = createServer();

defineRoutes(server, [UserController, ListController, TagController]);

console.log(':> Server running at http://localhost:3333/');
server.listen({ port: 3333 }).catch(reason => console.error('error :>', reason));
