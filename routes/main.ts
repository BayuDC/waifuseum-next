import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
    fastify.get('/', async req => {
        return { message: 'Hello World!' };
    });
}
