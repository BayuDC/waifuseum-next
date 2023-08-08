import { MyHandlerMethod } from './_';
import {
    CheckAlbumExistsSchema,
    GetAlbumListRecentSchema,
    GetAlbumListSchema,
    GetAlbumListSimpleSchema,
    GetAlbumSchema,
    LoadAlbumSchema,
} from '../schemas/album';

export const LoadAlbumPreHandler = async function (req, reply) {
    if (!req.query.album) return;

    const album = await this.Album.findOne({ slug: req.query.album }).populate('picturesCount').lean();
    if (!album) throw reply.notFound('Album not found');

    req.state.album = album;
} as MyHandlerMethod<typeof LoadAlbumSchema>;

export const GetAlbumListHandler = async function (req, reply) {
    const { page, count, search: keyword } = req.query;
    const { tag } = req.state;

    const query = this.Album.find().paginate(page, count).preload();

    keyword && query.search(keyword);
    tag && query.hasTag(tag).select({ tags: 0 });

    const albums = await query.lean({ getters: true });

    return {
        albums,
        tag,
    };
} as MyHandlerMethod<typeof GetAlbumListSchema>;

export const GetAlbumListSimpleHandler = async function (req, reply) {
    const { page, count, search: keyword } = req.query;
    const { tag } = req.state;

    const query = this.Album.find().paginate(page, count).select(['name', 'slug', 'alias']);

    keyword && query.search(keyword);
    tag && query.hasTag(tag).select({ tags: 0 });

    const albums = await query.lean({ getters: true });

    return {
        albums,
        tag,
    };
} as MyHandlerMethod<typeof GetAlbumListSimpleSchema>;

export const GetAlbumListRecentHandler = async function (req, reply) {
    const { count } = req.query;

    const ids = await this.Picture.find().distinct('album').lean();
    const albums = await this.Album.find({ _id: { $in: ids } })
        .limit(count)
        .preload()
        .lean({ getters: true });

    return {
        albums,
    };
} as MyHandlerMethod<typeof GetAlbumListRecentSchema>;

export const GetAlbumHandler = async function (req, reply) {
    const { slug } = req.params;

    const album = await this.Album.findOne({ slug }).preload().where('pictures').lean({ getters: true });
    if (!album) throw reply.notFound();

    return { album };
} as MyHandlerMethod<typeof GetAlbumSchema>;

export const CheckAlbumExistsHandler = async function (req, reply) {
    const { slug } = req.params;

    const exists = await this.Album.exists({ slug }).lean();

    reply.status(exists ? 200 : 404);
    reply.send(exists != null);
} as MyHandlerMethod<typeof CheckAlbumExistsSchema>;
