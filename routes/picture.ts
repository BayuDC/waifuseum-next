import { FastifyPluginCallback } from 'fastify';

import { GetPictureListSchema, GetPictureListTodaySchema, GetPixivPictureSchema } from '../schemas/picture';
import { GetPictureListHandler, GetPictureListTodayHandler, GetPixivPictureHandler } from '../handlers/picture';
import { LoadAlbumPreHandler } from '../handlers/album';

export default (function (fastify, options, done) {
    fastify.get('/pictures', {
        preHandler: [LoadAlbumPreHandler],
        schema: GetPictureListSchema,
        handler: GetPictureListHandler,
    });
    fastify.get('/pictures/today', {
        schema: GetPictureListTodaySchema,
        handler: GetPictureListTodayHandler,
    });
    fastify.get('/pictures/pixiv/:id', {
        schema: GetPixivPictureSchema,
        handler: GetPixivPictureHandler,
    });

    done();
} as FastifyPluginCallback);
