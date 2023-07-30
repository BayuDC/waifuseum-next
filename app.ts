import Fastify from 'fastify';
import './db';

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const fastify = Fastify();

fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/sensible'));

fastify.register(import('./plugins/error'));
fastify.register(import('./plugins/state'));

fastify.register(require('./routes/main'));
fastify.register(require('./routes/album'));
fastify.register(require('./routes/picture'));

fastify.listen({ port: port as number, host }, (err, addr) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});
