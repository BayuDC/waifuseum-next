import { FastifySchema } from 'fastify';

const albumShema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        slug: { type: 'string' },
        private: { type: 'boolean' },
        community: { type: 'boolean' },
        picturesCount: { type: 'number' },
        createdBy: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
            },
        },
        createdAt: { type: 'string' },
    },
};

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
                items: albumShema,
            },
            album: albumShema,
        },
    },
} as FastifySchema;
