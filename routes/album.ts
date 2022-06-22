import { FastifyInstance, RouteShorthandOptionsWithHandler } from 'fastify';

export default async function (fastify: FastifyInstance) {
    fastify.get('/albums', {
        async handler(req, reply) {
            return await this.mongo.db?.collection('albums').find().toArray();
        },
    } as RouteShorthandOptionsWithHandler);
}
