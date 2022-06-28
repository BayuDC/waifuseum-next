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
        preHandler: handler.load,
        handler: handler.show,
    } as RouteShorthandOptionsWithHandler);

    fastify.get('/albums/:id/pictures', {
        preHandler: handler.load,
        handler: handler.showPics,
    } as RouteShorthandOptionsWithHandler);

    done();
} as FastifyPluginCallback);
