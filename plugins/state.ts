import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyRequest {
        state: Record<string, any>;
    }
}

export default fp(function (fastify, options, done) {
    fastify.addHook('onRequest', (req, reply, done) => {
        req.state = {};
        done();
    });
    done();
} as FastifyPluginCallback);
