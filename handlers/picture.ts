import download from 'download';
import { parse } from 'node-html-parser';

import { MyHandlerMethod } from './_';
import {
    GetPictureListSchema,
    GetPictureListTodaySchema,
    GetPictureSchema,
    GetPixivPictureSchema,
} from '../schemas/picture';
import { isValidObjectId } from 'mongoose';

const dayInMs = 24 * 60 * 60 * 1000;

export const GetPictureListHandler = async function (req, reply) {
    const { page, count } = req.query;
    const { album, tag } = req.state;

    const query = this.Picture.find().paginate(page, count);

    if (album) {
        query.hasAlbum(album._id);
    } else if (tag) {
        query.hasAlbum(tag.albums);
        query.preload();
    } else {
        query.preload();
    }

    const pictures = await query.lean({ getters: true });

    console.log(tag);

    return { pictures, album, tag };
} as MyHandlerMethod<typeof GetPictureListSchema>;

export const GetPictureListTodayHandler = async function (req, reply) {
    const { page, count } = req.query;

    const pictures = await this.Picture.find({
        createdAt: { $gt: new Date(Date.now() - dayInMs) },
    })
        .paginate(page, count)
        .preload()
        .lean({ getters: true });
    const picturesCount = await this.Picture.find({
        createdAt: { $gt: new Date(Date.now() - dayInMs) },
    }).count();

    return {
        pictures,
        picturesCount,
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

export const GetPictureHandler = async function (req, reply) {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw reply.imateapot('Picture id is not valid');

    const picture = await this.Picture.findById(id)
        .preload()
        .populate('createdBy', ['id', 'name'])
        .lean({ getters: true });
    if (!picture) throw reply.notFound('Picture not found');

    return { picture };
} as MyHandlerMethod<typeof GetPictureSchema>;
