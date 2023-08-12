import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import './db';

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const fastify = Fastify({
    logger: {
        level: 'debug',
        transport: {
            target: '@mgcrea/pino-pretty-compact',
            options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
        },
    },
    disableRequestLogging: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/sensible'));
fastify.register(import('@fastify/swagger'));
fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
});
fastify.register(import('@mgcrea/fastify-request-logger'));

fastify.register(import('./plugins/error'));
fastify.register(import('./plugins/state'));
fastify.register(import('./plugins/model'));

fastify.register(require('./routes/main'));
fastify.register(require('./routes/album'));
fastify.register(require('./routes/picture'));
fastify.register(require('./routes/tag'));

fastify.listen({ port: port as number, host }, (err, addr) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});
