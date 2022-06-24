import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import createError from 'http-errors';

export default {
    async index(req: FastifyRequest) {
        const albums = await this.model.findAll();

        return { albums };
    },
    async show(req: FastifyRequest) {
        const album = await this.model.findById();

        return { album };
    },
} as {
    index: RouteHandlerMethod;
    show: RouteHandlerMethod;
};
