import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

import { Album, Picture, Tag } from '../models';

declare module 'fastify' {
    interface FastifyInstance {
        Album: typeof Album;
        Picture: typeof Picture;
        Tag: typeof Tag;
    }
}

export default fp(function (fastify, options, done) {
    fastify.decorate('Album', Album);
    fastify.decorate('Picture', Picture);
    fastify.decorate('Tag', Tag);

    done();
} as FastifyPluginCallback);
