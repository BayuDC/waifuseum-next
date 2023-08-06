import { MyHandlerMethod } from '../app.d';
import { GetPictureSchema } from '../schemas/picture';

import Picture from '../models/picture';

const dayInMs = 24 * 60 * 60 * 1000;

export const GetTodayPictureHandler: MyHandlerMethod<typeof GetPictureSchema> = async (req, reply) => {
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
