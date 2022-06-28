import { RouteHandlerMethod } from 'fastify';
import { isValidObjectId } from 'mongoose';

import Album from '../models/album';
import Picture from '../models/picture';

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
    async load(req, reply) {
        const { id } = req.params as AlbumParams;
        if (!isValidObjectId(id)) throw reply.badRequest();

        const album = await Album.findById(id).lean();
        if (!album) throw reply.notFound();

        req.state.album = album;
    },
    async show(req, reply) {
        const { album } = req.state;

        return { album };
    },
    async showPics(req, reply) {
        const { album } = req.state;
        const { page, count } = req.query as AlbumQuery;

        const pictures = await Picture.find({
            album: album?._id,
        }).paginate(page, count);

        return { pictures };
    },
} as {
    index: RouteHandlerMethod;
    load: RouteHandlerMethod;
    show: RouteHandlerMethod;
    showPics: RouteHandlerMethod;
};
