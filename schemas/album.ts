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
        updatedAt: { type: 'string' },
    },
};

const querySchema = {
    type: 'object',
    properties: {
        page: { type: 'number', nullable: true, default: 1 },
        count: { type: 'number', nullable: true, default: 10 },
        simple: { type: 'boolean', nullable: true, default: false },
    },
};
const paramsSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
};

const index: FastifySchema = {
    querystring: querySchema,
    response: {
        '2xx': {
            albums: {
                type: 'array',
                items: albumShema,
            },
        },
    },
};

const show: FastifySchema = {
    params: paramsSchema,
    response: {
        '2xx': {
            album: albumShema,
        },
    },
};

export default { index, show };
