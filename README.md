# Listify

[![GitHub deployments](https://img.shields.io/github/deployments/kauefraga/listify/production?logo=vercel&label=build)](https://listify.kauefraga.dev/)
[![Listify's license](https://img.shields.io/github/license/kauefraga/listify)](https://github.com/kauefraga/listify/blob/main/LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/kauefraga/listify/main)](https://github.com/kauefraga/listify)

> Your favorite lists board!

I was feeling that there are no simple options for scratching a bunch of lists (daily tasks list, shopping list...), so here's Listify, **an easy to use board for lists**.

We all love lists, but where do you keep them? Maybe in WhatsApp or in a plain text file somewhere? Listify is **fully-featured** and aims to be **as convenient as your current solution**.

Access now: [listify.kauefraga.dev](https://listify.kauefraga.dev/)

- [x] Lists board
- [x] Create & remove lists

## How to setup the development environment

Make sure you have [Node](https://nodejs.org/en), [Bun](https://bun.sh/) and [Docker](https://www.docker.com/) installed in your machine.

Clone the project in your machine (fork it first if you want to contribute)

```sh
git clone https://github.com/kauefraga/listify.git

cd listify
```

Create and start containers

```sh
docker compose up -d
```

Install the dependencies of the project

```sh
bun install
```

Run the back end server

```sh
cd apps/backend

bun dev
```

Execute the front end server

```sh
cd apps/frontend

bun dev
```

## Workspaces

This monorepo contains Listify's front end and back end, they are under the [`apps`](apps/) directory.

About the technologies used, in general:

- [Node](https://nodejs.org/en) (runtime)
- [Bun](https://bun.sh/) (package manager and monorepo)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Biome](https://biomejs.dev/) with [@zhaoworks/biome](https://www.npmjs.com/package/@zhaoworks/biome)

### Back end

The [API reference](API.md) document covers all the back end routes and their details.

Built using the technologies mentioned early and these below.

- [Fastify](https://fastify.dev/) with [fastify/cors](https://www.npmjs.com/package/@fastify/cors) and [fastify/helmet](https://www.npmjs.com/package/@fastify/helmet) plugins
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/) with [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)
- [Argon2](https://www.npmjs.com/package/argon2)

### Front end

The draft design can be found at [listify's figma](https://www.figma.com/design/RDbnqN7yUQLA6koqzneQ12/Listify?node-id=0-1&t=IkQlP2LI8cUCQKT4-1).

Crafted using:

- [Figma](https://www.figma.com/)
- [React](https://react.dev/) with [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query/v4) with [the native Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/)
- [Zustand](https://www.npmjs.com/package/zustand)

## License

This project is licensed under the MIT License - See the [LICENSE](https://github.com/kauefraga/listify/blob/main/LICENSE) for more information.

---

If Listify has helped you, consider giving it a star ⭐

🇧🇷: Se você gostou do projeto, considere dar uma estrela no repositório ⭐, fazer [uma doação para eu tomar um cafézinho](https://pixmeacoffee.vercel.app/kauefraga) ☕ ou comentar sobre no [Bluesky](https://bsky.app/) 💙
