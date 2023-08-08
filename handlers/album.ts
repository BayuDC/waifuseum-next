import { MyHandlerMethod } from '.';
import { GetAlbumListSchema, GetAlbumListSimpleSchema, GetAlbumSchema } from '../schemas/album';

export const GetAlbumListHandler = async function (req, reply) {
    const { page, count, search: keyword } = req.query;

    return {
        albums: await this.Album.find().paginate(page, count).search(keyword).preload().lean({ getters: true }),
    };
} as MyHandlerMethod<typeof GetAlbumListSchema>;

export const GetAlbumListSimpleHandler = async function (req, reply) {
    const { page, count, search: keyword } = req.query;

    return {
        albums: await this.Album.find().paginate(page, count).search(keyword).select(['name', 'slug', 'alias']).lean(),
    };
} as MyHandlerMethod<typeof GetAlbumListSimpleSchema>;

export const GetAlbumHandler = async function (req, reply) {
    const { slug } = req.params;

    const album = await this.Album.findOne({ slug }).preload().lean({ getters: true });
    if (!album) throw reply.notFound();

    return { album };
} as MyHandlerMethod<typeof GetAlbumSchema>;
