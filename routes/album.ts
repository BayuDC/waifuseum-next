import { FastifyInstance, RouteShorthandOptionsWithHandler } from 'fastify';

import handler from '../handlers/album';

export default async function (fastify: FastifyInstance) {
    fastify.get('/albums', {
        handler: handler.index,
    } as RouteShorthandOptionsWithHandler);
}
