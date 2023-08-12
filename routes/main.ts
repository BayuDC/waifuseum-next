import { FastifyPluginCallback } from 'fastify';
import { GetStatisticsSchema } from '../schemas/main';

export default (function (fastify, options, done) {
    fastify.get('/', {
        handler: async function () {
            return { message: 'Hello World!' };
        },
    });
    fastify.get('/stats', {
        schema: GetStatisticsSchema,
        handler: async function () {
            return {
                picture: await this.Picture.count(),
                album: await this.Album.count(),
                tag: await this.Tag.count(),
                user: await this.User.count(),
            };
        },
    });

    done();
} as FastifyPluginCallback);
