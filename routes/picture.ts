import { FastifyPluginCallback } from 'fastify';

import { GetPictureSchema } from '../schemas/picture';
import { GetTodayPictureHandler } from '../handlers/picture';

export default (function (fastify, options, done) {
    fastify.get('/pictures/today', {
        schema: GetPictureSchema,
        handler: GetTodayPictureHandler,
    });

    done();
} as FastifyPluginCallback);
