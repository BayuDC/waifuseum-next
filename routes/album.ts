import { FastifyPluginCallback, RouteShorthandOptionsWithHandler } from 'fastify';

import handler from '../handlers/album';
import schema from '../schemas/album';

export default (function (fastify, options, done) {
    fastify.get('/albums', {
        schema: schema.index,
        handler: handler.index,
    } as RouteShorthandOptionsWithHandler);
    fastify.get('/albums/:id', {
        schema: schema.show,
        handler: handler.show,
    } as RouteShorthandOptionsWithHandler);

    done();
} as FastifyPluginCallback);
