import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import createError from 'http-errors';

export default {
    async index(req: FastifyRequest) {
        const full = (req.query as { full: any }).full != undefined;
        const albums = (await req.server.model.findAll(full)) || [];

        return { albums };
    },
    async show(req: FastifyRequest) {
        const id = (req.params as { id: string }).id;
        const { full, populate } = req.query as { full: any; populate: any };

        const album = await req.server.model.findById(id, full != undefined, populate != undefined);

        if (!album) throw createError(404, 'Album not found');

        return { album };
    },
} as {
    index: RouteHandlerMethod;
    show: RouteHandlerMethod;
};
