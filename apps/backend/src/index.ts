import { createServer, defineRoutes } from './server'

const s = createServer()

defineRoutes(s).listen({ port: 3333 }).catch(reason => console.error(reason))
