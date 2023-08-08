import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

import { Album, Picture } from '../models';

declare module 'fastify' {
    interface FastifyInstance {
        Album: typeof Album;
        Picture: typeof Picture;
    }
}

export default fp(function (fastify, options, done) {
    fastify.decorate('Album', Album);
    fastify.decorate('Picture', Picture);

    done();
} as FastifyPluginCallback);
