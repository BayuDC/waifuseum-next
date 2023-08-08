import download from 'download';
import { parse } from 'node-html-parser';

import { MyHandlerMethod } from '../app.d';
import { GetPictureListSchema, GetPictureListTodaySchema, GetPixivPictureSchema } from '../schemas/picture';

import { Album, Picture } from '../models';

const dayInMs = 24 * 60 * 60 * 1000;

export const GetPictureListHandler: MyHandlerMethod<typeof GetPictureListSchema> = async (req, reply) => {
    const { page, count, album: slug } = req.query;

    if (!slug) {
        return { pictures: await Picture.find().paginate(page, count).preload().lean({ getters: true }) };
    }

    const album = await Album.findOne({ slug }).lean({ getters: true });
    if (!album) throw reply.notFound();

    return {
        pictures: await Picture.find({ album: album._id })
            .select({ album: 0 })
            .paginate(page, count)
            .lean({ getters: true }),
    };
};

export const GetPictureListTodayHandler: MyHandlerMethod<typeof GetPictureListTodaySchema> = async (req, reply) => {
    const { page, count } = req.query;

    return {
        pictures: await Picture.find({
            createdAt: { $gt: new Date(Date.now() - dayInMs) },
        })
            .paginate(page, count)
            .preload()
            .lean({ getters: true }),
        picturesCount: await Picture.find({
            createdAt: { $gt: new Date(Date.now() - dayInMs) },
        }).count(),
    };
};

export const GetPixivPictureHandler: MyHandlerMethod<typeof GetPixivPictureSchema> = async (req, reply) => {
    const { id } = req.params;
    const source = 'https://www.pixiv.net/en/artworks/' + id;

    const res = await download(source, {
        encoding: 'utf-8',
    });

    const root = parse(res as any);
    const data = JSON.parse(root.getElementById('meta-preload-data').getAttribute('content')!);

    return { source, urls: data.illust[id].urls };
};
