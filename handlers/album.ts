import { RouteHandlerMethod } from 'fastify';

export default {
    async index(req, reply) {
        return await this.mongo.db?.collection('albums').find().toArray();
    },
} as {
    index: RouteHandlerMethod;
};
