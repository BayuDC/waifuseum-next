import { FastifyPluginCallback } from 'fastify';

import {
    CheckAlbumExistsHandler,
    GetAlbumHandler,
    GetAlbumListHandler,
    GetAlbumListSimpleHandler,
} from '../handlers/album';
import { CheckAlbumExistsSchema, GetAlbumListSchema, GetAlbumListSimpleSchema, GetAlbumSchema } from '../schemas/album';

export default (function (fastify, options, done) {
    fastify.get('/albums', {
        schema: GetAlbumListSchema,
        handler: GetAlbumListHandler,
    });
    fastify.get('/albums/simple', {
        schema: GetAlbumListSimpleSchema,
        handler: GetAlbumListSimpleHandler,
    });

    fastify.get('/albums/:slug', {
        schema: GetAlbumSchema,
        handler: GetAlbumHandler,
    });
    fastify.get('/albums/:slug/exists', {
        schema: CheckAlbumExistsSchema,
        handler: CheckAlbumExistsHandler,
    });

    done();
} as FastifyPluginCallback);
