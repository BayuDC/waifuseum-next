import Fastify from 'fastify';
import mongoose from 'mongoose';

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const fastify = Fastify();

fastify.register(require('@fastify/cors'));

fastify.register(require('./routes/main'));
fastify.register(require('./routes/album'));

fastify.setErrorHandler((err, req, reply) => {
    reply.status(err.statusCode || 500);
    reply.send({
        message: err.message || 'Somehting went wrong',
    });
});

fastify.listen({ port: port as number, host }, (err, addr) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});

const mongouri = process.env.MONGO_URI;

mongoose.connect(mongouri as string).then(() => {
    console.log('Connected to database');
});
