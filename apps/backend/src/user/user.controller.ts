import type { Controller } from '../server';

export const UserController: Controller = http => {
  http.get('/v1/user/create', (request, reply) => {
    return reply.status(201).send({ message: 'Usuário criado com sucesso.' });
  });
};
