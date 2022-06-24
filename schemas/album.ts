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
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
        },
    },
    response: {
        '2xx': {
            albums: {
                type: 'array',
                items: albumShema,
            },
            album: albumShema,
        },
    },
} as FastifySchema;
