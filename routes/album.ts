import { FastifyInstance, RouteShorthandOptionsWithHandler } from 'fastify';

import handler from '../handlers/album';
import schema from '../schemas/album';

export default function (fastify: FastifyInstance, options: Object, done: Function) {
    fastify.get('/albums', {
        schema: schema.index,
        handler: handler.index,
    } as RouteShorthandOptionsWithHandler);
    fastify.get('/albums/:id', {
        schema: schema.show,
        handler: handler.show,
    } as RouteShorthandOptionsWithHandler);

    done();
}
