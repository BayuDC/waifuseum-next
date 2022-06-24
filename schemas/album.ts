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

const index: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            simple: {},
        },
    },
    response: {
        '2xx': {
            albums: { type: 'array', items: albumShema },
        },
    },
};

const show: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
        },
    },
    response: {
        '2xx': {
            album: albumShema,
        },
    },
};

export default {
    index,
    show,
};
