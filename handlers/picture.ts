import { MyHandlerMethod } from '../app.d';
import { GetPictureListSchema } from '../schemas/picture';

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
