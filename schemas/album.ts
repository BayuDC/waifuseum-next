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
const pictureSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        url: { type: 'string' },
        source: { type: 'string' },
    },
};

const index: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            simple: {},
            page: { type: 'number', nullable: true },
            count: { type: 'number', nullable: true },
        },
    },
    response: {
        '2xx': {
            albums: { type: 'array', items: albumShema },
        },
    },
};

const show: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number', nullable: true },
            count: { type: 'number', nullable: true },
        },
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
        },
    },
    response: {
        '2xx': {
            album: albumShema,
            pictures: { type: 'array', items: pictureSchema },
        },
    },
};

export default {
    index,
    show,
};
