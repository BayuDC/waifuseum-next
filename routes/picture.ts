import { FastifyPluginCallback } from 'fastify';

import { GetPictureListSchema } from '../schemas/picture';
import { GetPictureListHandler, GetPictureListTodayHandler } from '../handlers/picture';

export default (function (fastify, options, done) {
    fastify.get('/pictures', {
        schema: GetPictureListSchema,
        handler: GetPictureListHandler,
    });
    fastify.get('/pictures/today', {
        schema: GetPictureListSchema,
        handler: GetPictureListTodayHandler,
    });

    done();
} as FastifyPluginCallback);
