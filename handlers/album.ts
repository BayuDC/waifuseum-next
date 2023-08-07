import { MyHandlerMethod } from '../app.d';
import { GetAlbumListSchema, GetAlbumListSimpleSchema, GetAlbumSchema } from '../schemas/album';

import { Album } from '../models';

export const GetAlbumListHandler: MyHandlerMethod<typeof GetAlbumListSchema> = async (req, reply) => {
    const { page, count, search: keyword } = req.query;

    return {
        albums: await Album.find().paginate(page, count).search(keyword).preload().lean({ getters: true }),
    };
};
export const GetAlbumListSimpleHandler: MyHandlerMethod<typeof GetAlbumListSimpleSchema> = async (req, reply) => {
    const { page, count, search: keyword } = req.query;

    return {
        albums: await Album.find().paginate(page, count).search(keyword).select(['name', 'slug', 'alias']).lean(),
    };
};

export const GetAlbumHandler: MyHandlerMethod<typeof GetAlbumSchema> = async (req, reply) => {
    const { slug } = req.params;

    const album = await Album.findOne({ slug }).preload().lean({ getters: true });
    if (!album) throw reply.notFound();

    return { album };
};
