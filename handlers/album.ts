import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import createError from 'http-errors';
import Album from '../models/album';

interface AlbumQuery {
    page: number;
    count: number;
    simple: boolean;
}
interface AlbumParams {
    id: string;
}

export default {
    async index(req: FastifyRequest) {
        const { page, count, simple } = req.query as AlbumQuery;

        const albums = await Album.paginate(page, count, { simple });

        return { albums };
    },
    async show(req: FastifyRequest) {
        const { id } = req.params as AlbumParams;

        const album = await Album.findById(id).lean();
        if (!album) throw createError(404, 'Album not found');

        return { album };
    },
} as {
    index: RouteHandlerMethod;
    show: RouteHandlerMethod;
};
