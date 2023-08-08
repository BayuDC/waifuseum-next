import download from 'download';
import { parse } from 'node-html-parser';

import { MyHandlerMethod } from '.';
import { GetPictureListSchema, GetPictureListTodaySchema, GetPixivPictureSchema } from '../schemas/picture';

const dayInMs = 24 * 60 * 60 * 1000;

export const GetPictureListHandler = async function (req, reply) {
    const { page, count, album: slug } = req.query;

    if (!slug) {
        return { pictures: await this.Picture.find().paginate(page, count).preload().lean({ getters: true }) };
    }

    const album = await this.Album.findOne({ slug }).lean({ getters: true });
    if (!album) throw reply.notFound();

    return {
        pictures: await this.Picture.find({ album: album._id })
            .select({ album: 0 })
            .paginate(page, count)
            .lean({ getters: true }),
    };
} as MyHandlerMethod<typeof GetPictureListSchema>;

export const GetPictureListTodayHandler = async function (req, reply) {
    const { page, count } = req.query;

    return {
        pictures: await this.Picture.find({
            createdAt: { $gt: new Date(Date.now() - dayInMs) },
        })
            .paginate(page, count)
            .preload()
            .lean({ getters: true }),
        picturesCount: await this.Picture.find({
            createdAt: { $gt: new Date(Date.now() - dayInMs) },
        }).count(),
    };
} as MyHandlerMethod<typeof GetPictureListTodaySchema>;

export const GetPixivPictureHandler = async function (req, reply) {
    const { id } = req.params;
    const source = 'https://www.pixiv.net/en/artworks/' + id;

    const res = await download(source, {
        encoding: 'utf-8',
    });

    const root = parse(res as any);
    const data = JSON.parse(root.getElementById('meta-preload-data').getAttribute('content')!);

    return { source, urls: data.illust[id].urls };
} as MyHandlerMethod<typeof GetPixivPictureSchema>;
