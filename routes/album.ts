import { FastifyPluginCallback } from 'fastify';

import { GetAlbumHandler, GetAlbumListHandler, GetAlbumListSimpleHandler } from '../handlers/album';
import { GetAlbumListSchema, GetAlbumListSimpleSchema, GetAlbumSchema } from '../schemas/album';

export default (function (fastify, options, done) {
    fastify.get('/albums', {
        schema: GetAlbumListSchema,
        handler: GetAlbumListHandler,
    });
    fastify.get('/albums/simple', {
        schema: GetAlbumListSimpleSchema,
        handler: GetAlbumListSimpleHandler,
    });

    fastify.get('/albums/:id', {
        schema: GetAlbumSchema,
        handler: GetAlbumHandler,
    });

    done();
} as FastifyPluginCallback);
