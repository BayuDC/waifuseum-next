import { FastifyPluginCallback, RouteShorthandOptionsWithHandler } from 'fastify';

import handler from '../handlers/picture';

export default (function (fastify, options, done) {
    fastify.get('/pictures/today', {
        handler: handler.index,
    } as RouteShorthandOptionsWithHandler);

    done();
} as FastifyPluginCallback);
