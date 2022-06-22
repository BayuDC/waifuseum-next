import Fastify, { FastifyInstance } from 'fastify';

const port = process.env.PORT || 8080;
const fastify: FastifyInstance = Fastify();

fastify.register(require('./routes/main'));

fastify.listen({ port: port as number }, (err, addr) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});
