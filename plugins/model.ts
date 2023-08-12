import fp from 'fastify-plugin';
import { FastifyPluginCallback } from 'fastify';

import { Album, Picture, Tag, User } from '../models';

declare module 'fastify' {
    interface FastifyInstance {
        Album: typeof Album;
        Picture: typeof Picture;
        Tag: typeof Tag;
        User: typeof User;
    }
}

export default fp(function (fastify, options, done) {
    fastify.decorate('Album', Album);
    fastify.decorate('Picture', Picture);
    fastify.decorate('Tag', Tag);
    fastify.decorate('User', User);

    done();
} as FastifyPluginCallback);
