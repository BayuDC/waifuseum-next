import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import createError from 'http-errors';
import Album from '../models/album';

interface AlbumQuery {
    page: number;
    count: number;
}

export default {
    async index(req: FastifyRequest) {
        const { page, count } = req.query as AlbumQuery;

        const albums = await Album.paginate(page, count);

        return { albums };
    },
    async show(req: FastifyRequest) {
        const { id } = req.params as { id: string };

        const album = await Album.findById(id).lean();
        if (!album) throw createError(404, 'Album not found');

        return { album };
    },
} as {
    index: RouteHandlerMethod;
    show: RouteHandlerMethod;
};
