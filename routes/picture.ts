import { FastifyPluginCallback, RouteShorthandOptionsWithHandler } from 'fastify';

import handler from '../handlers/picture';
import schema from '../schemas/picture';

export default (function (fastify, options, done) {
    fastify.get('/pictures/today', {
        schema: schema.index,
        handler: handler.index,
    } as RouteShorthandOptionsWithHandler);

    done();
} as FastifyPluginCallback);
