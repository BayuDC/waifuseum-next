import { FastifyInstance } from 'fastify';

import handler from '../handlers/album';
import schema from '../schemas/album';
import model from '../models/album';

export default function (fastify: FastifyInstance, options: Object, done: Function) {
    fastify.register(model);
    fastify.get('/albums', { schema }, handler.index);
    fastify.get('/albums/:id', { schema }, handler.show);

    done();
}
