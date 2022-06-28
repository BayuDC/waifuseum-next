import { RouteHandlerMethod } from 'fastify';
import { isValidObjectId } from 'mongoose';

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
    async index(req, reply) {
        const { page, count, simple } = req.query as AlbumQuery;

        const albums = await Album.paginate(page, count, { simple });

        return { albums };
    },
    async show(req, reply) {
        const { id } = req.params as AlbumParams;
        if (!isValidObjectId(id)) throw reply.badRequest();

        const album = await Album.findById(id).lean();
        if (!album) throw reply.notFound();

        return { album };
    },
} as {
    index: RouteHandlerMethod;
    show: RouteHandlerMethod;
};
