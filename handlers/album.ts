import { MyHandlerMethod } from '../app.d';
import { GetAlbumListSchema, GetAlbumListSimpleSchema, GetAlbumSchema } from '../schemas/album';

import Album from '../models/album';

export const GetAlbumListHandler: MyHandlerMethod<typeof GetAlbumListSchema> = async (req, reply) => {
    const { page, count, search } = req.query;

    const albums = await Album.paginate(page, count, { simple: false, search });

    return { albums };
};
export const GetAlbumListSimpleHandler: MyHandlerMethod<typeof GetAlbumListSimpleSchema> = async (req, reply) => {
    const { page, count, search } = req.query;

    const albums = await Album.paginate(page, count, { simple: true, search });

    return { albums };
};

export const GetAlbumHandler: MyHandlerMethod<typeof GetAlbumSchema> = async (req, reply) => {
    const { slug } = req.params;

    const album = await Album.findOne({ slug }).lean();
    if (!album) throw reply.notFound();

    return { album };
};
