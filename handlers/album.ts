import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import createError from 'http-errors';

export default {
    async index(req: FastifyRequest) {
        // const { simple, page, count } = req.query as {
        //     simple: any;
        //     page: number;
        //     count: number;
        // };
        // const albums = await this.model.findAll({
        //     simple: simple != undefined,
        //     page,
        //     count,
        // });
        // return { albums };
    },
    async show(req: FastifyRequest) {
        // const { id } = req.params as { id: string };
        // const album = await this.model.findById(id);
        // if (!album) throw createError(404, 'Album not found');
        // return { album };
    },
    async showPics(req: FastifyRequest) {
        // const { id } = req.params as { id: string };
        // const { page, count } = req.query as { page: number; count: number };
        // const pictures = await this.model.findPics(id, { page, count });
        // return { pictures };
    },
} as {
    index: RouteHandlerMethod;
    show: RouteHandlerMethod;
    showPics: RouteHandlerMethod;
};
