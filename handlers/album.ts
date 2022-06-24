import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import createError from 'http-errors';

export default {
    async index(req: FastifyRequest) {
        const { simple } = req.query as { simple: any };
        const albums = await this.model.findAll({
            simple: simple != undefined,
        });

        return { albums };
    },
    async show(req: FastifyRequest) {
        const { id } = req.params as { id: string };
        const album = await this.model.findById(id);

        if (!album) throw createError(404, 'Album not found');

        return { album };
    },
} as {
    index: RouteHandlerMethod;
    show: RouteHandlerMethod;
};
