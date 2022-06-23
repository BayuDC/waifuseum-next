import Fastify, { FastifyInstance } from 'fastify';
import { FastifyMongodbOptions } from '@fastify/mongodb';

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const fastify: FastifyInstance = Fastify();

fastify.register(require('@fastify/mongodb'), {
    url: process.env.MONGO_URI,
    forceClose: true,
} as FastifyMongodbOptions);
fastify.register(require('@fastify/cors'));

fastify.register(require('./routes/main'));
fastify.register(require('./routes/album'));

fastify.listen({ port: port as number, host }, (err, addr) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});
