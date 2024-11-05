import { defineController } from '../server';

export const UserController = defineController(http => {
  http.get('/v1/user/create', (request, reply) => {
    return reply.status(201).send({ message: 'Usuário criado com sucesso.' });
  });
});
