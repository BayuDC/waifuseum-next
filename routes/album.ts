import { FastifyInstance } from 'fastify';

import handler from '../handlers/album';
import schema from '../schemas/album';

export default async function (fastify: FastifyInstance) {
    fastify.get('/albums', { schema }, handler.index);
}
