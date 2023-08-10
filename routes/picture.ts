import { FastifyPluginCallback } from 'fastify';

import {
    GetPictureListSchema,
    GetPictureListTodaySchema,
    GetPictureSchema,
    GetPixivPictureSchema,
} from '../schemas/picture';
import {
    GetPictureHandler,
    GetPictureListHandler,
    GetPictureListTodayHandler,
    GetPixivPictureHandler,
} from '../handlers/picture';
import { LoadAlbumPreHandler } from '../handlers/album';
import { LoadTagPreHandler } from '../handlers/tag';

export default (function (fastify, options, done) {
    fastify.get('/pictures', {
        preHandler: [LoadAlbumPreHandler, LoadTagPreHandler],
        schema: GetPictureListSchema,
        handler: GetPictureListHandler,
    });
    fastify.get('/pictures/today', {
        schema: GetPictureListTodaySchema,
        handler: GetPictureListTodayHandler,
    });
    fastify.get('/pictures/:id', {
        schema: GetPictureSchema,
        handler: GetPictureHandler,
    });
    fastify.get('/pictures/pixiv/:id', {
        schema: GetPixivPictureSchema,
        handler: GetPixivPictureHandler,
    });

    done();
} as FastifyPluginCallback);
