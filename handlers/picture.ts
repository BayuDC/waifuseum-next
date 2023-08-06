import download from 'download';
import { parse } from 'node-html-parser';

import { MyHandlerMethod } from '../app.d';
import { GetPictureListSchema, GetPixivPictureSchema } from '../schemas/picture';

import Album from '../models/album';
import Picture from '../models/picture';

const dayInMs = 24 * 60 * 60 * 1000;

export const GetPictureListHandler: MyHandlerMethod<typeof GetPictureListSchema> = async (req, reply) => {
    const { page, count, album: albumSlug } = req.query;

    if (!albumSlug) {
        const pictures = await Picture.find()
            .paginate(page, count)
            .populate({
                path: 'album',
                options: { simple: true },
            });
        return { pictures };
    }

    const album = await Album.findOne({ slug: albumSlug }).setOptions({ simple: true }).lean();
    if (!album) throw reply.notFound();

    const pictures = await Picture.find({ album: album.id }).paginate(page, count);
    return { pictures };
};

export const GetPictureListTodayHandler: MyHandlerMethod<typeof GetPictureListSchema> = async (req, reply) => {
    const { page, count } = req.query;

    const pictures = await Picture.find({
        createdAt: { $gt: new Date(Date.now() - dayInMs) },
    })
        .paginate(page, count)
        .populate({
            path: 'album',
            options: { simple: true },
        });

    return { pictures };
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
