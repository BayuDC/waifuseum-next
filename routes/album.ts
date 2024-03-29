import { FastifyPluginCallback } from 'fastify';

import {
    CheckAlbumExistsHandler,
    GetAlbumHandler,
    GetAlbumListHandler,
    GetAlbumListRecentHandler,
    GetAlbumListSimpleHandler,
} from '../handlers/album';
import {
    CheckAlbumExistsSchema,
    GetAlbumListRecentSchema,
    GetAlbumListSchema,
    GetAlbumListSimpleSchema,
    GetAlbumSchema,
} from '../schemas/album';

import { LoadTagPreHandler } from '../handlers/tag';

export default (function (fastify, options, done) {
    fastify.get('/albums', {
        preHandler: [LoadTagPreHandler],
        schema: GetAlbumListSchema,
        handler: GetAlbumListHandler,
    });
    fastify.get('/albums/simple', {
        preHandler: [LoadTagPreHandler],
        schema: GetAlbumListSimpleSchema,
        handler: GetAlbumListSimpleHandler,
    });
    fastify.get('/albums/recent', {
        schema: GetAlbumListRecentSchema,
        handler: GetAlbumListRecentHandler,
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
