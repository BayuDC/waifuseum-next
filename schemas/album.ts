import { FastifySchema } from 'fastify';

export default {
    response: {
        default: {
            albums: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        slug: { type: 'string' },
                        private: { type: 'boolean' },
                        community: { type: 'boolean' },
                    },
                },
            },
        },
    },
} as FastifySchema;
