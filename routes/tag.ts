import { FastifyPluginCallback } from 'fastify';
import { CheckTagExistsHandler, GetTagHandler, GetTagListHandler, GetTagListSimpleHandler } from '../handlers/tag';
import { CheckTagExistsSchema, GetTagListSchema, GetTagListSimpleSchema, GetTagSchema } from '../schemas/tag';

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
    fastify.get('/tags/:slug/exists', {
        schema: CheckTagExistsSchema,
        handler: CheckTagExistsHandler,
    });
    done();
} as FastifyPluginCallback);
