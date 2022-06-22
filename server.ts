import Fastify, { FastifyInstance } from 'fastify';
import fastifyMongodb, { FastifyMongodbOptions } from '@fastify/mongodb';

const port = process.env.PORT || 8080;
const host = process.env.NODE_ENV == 'production' ? '0.0.0.0' : '127.0.0.1';

const fastify: FastifyInstance = Fastify();

fastify.register(require('@fastify/mongodb'), {
    url: process.env.MONGO_URI,
    forceClose: true,
} as FastifyMongodbOptions);

fastify.register(require('./routes/main'));

fastify.listen({ port: port as number, host }, (err, addr) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});
