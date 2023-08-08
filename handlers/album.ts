import { MyHandlerMethod } from '.';
import { CheckAlbumExistsSchema, GetAlbumListSchema, GetAlbumListSimpleSchema, GetAlbumSchema } from '../schemas/album';

export const GetAlbumListHandler = async function (req, reply) {
    const { page, count, search: keyword } = req.query;

    const tag = await this.Tag.findOne({ slug: req.query.tag }).lean();
    if (!tag) throw reply.notFound('Tag not found');

    return {
        albums: await this.Album.find()
            .paginate(page, count)
            .search(keyword)
            .hasTag(tag?._id)
            .preload()
            .lean({ getters: true }),
        tag,
    };
} as MyHandlerMethod<typeof GetAlbumListSchema>;

export const GetAlbumListSimpleHandler = async function (req, reply) {
    const { page, count, search: keyword } = req.query;

    const tag = await this.Tag.findOne({ slug: req.query.tag }).lean();
    if (!tag) throw reply.notFound('Tag not found');

    return {
        albums: await this.Album.find()
            .paginate(page, count)
            .search(keyword)
            .hasTag(tag?._id)
            .select(['name', 'slug', 'alias'])
            .lean(),
        tag,
    };
} as MyHandlerMethod<typeof GetAlbumListSimpleSchema>;

export const GetAlbumHandler = async function (req, reply) {
    const { slug } = req.params;

    const album = await this.Album.findOne({ slug }).preload().lean({ getters: true });
    if (!album) throw reply.notFound();

    return { album };
} as MyHandlerMethod<typeof GetAlbumSchema>;

export const CheckAlbumExistsHandler = async function (req, reply) {
    const { slug } = req.params;

    const exists = await this.Album.exists({ slug }).lean();

    reply.status(exists ? 200 : 404);
    reply.send(exists != null);
} as MyHandlerMethod<typeof CheckAlbumExistsSchema>;
