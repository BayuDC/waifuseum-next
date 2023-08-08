import { FastifyPluginCallback } from 'fastify';
import { GetTagHandler, GetTagListHandler, GetTagListSimpleHandler } from '../handlers/tag';
import { GetTagListSchema, GetTagListSimpleSchema, GetTagSchema } from '../schemas/tag';

export default (function (fastify, options, done) {
    fastify.get('/tags', {
        schema: GetTagListSchema,
        handler: GetTagListHandler,
    });
    fastify.get('/tags/simple', {
        schema: GetTagListSimpleSchema,
        handler: GetTagListSimpleHandler,
    });
    fastify.get('/tags/:slug', {
        schema: GetTagSchema,
        handler: GetTagHandler,
    });
    done();
} as FastifyPluginCallback);
