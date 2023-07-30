import { FastifySchema } from 'fastify';

const pictureSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        url: { type: 'string' },
        urls: {
            type: 'object',
            properties: {
                thumbnail: { type: 'string' },
                minimal: { type: 'string' },
                standard: { type: 'string' },
                original: { type: 'string' },
            },
        },
        source: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
    },
};

const querySchema = {
    type: 'object',
    properties: {
        page: { type: 'number', nullable: true, default: 1 },
        count: { type: 'number', nullable: true, default: 10 },
    },
};

const index: FastifySchema = {
    querystring: querySchema,
    response: {
        '2xx': {
            pictures: {
                type: 'array',
                items: pictureSchema,
            },
        },
    },
};

export default { index };
