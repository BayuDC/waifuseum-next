import { FastifySchema } from 'fastify';

export default {
    querystring: {
        type: 'object',
        properties: {
            full: {},
        },
    },
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
                        createdBy: { type: 'string' },
                        createdAt: { type: 'string' },
                    },
                },
            },
        },
    },
} as FastifySchema;
