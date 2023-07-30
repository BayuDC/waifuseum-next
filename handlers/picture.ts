import { RouteHandlerMethod } from 'fastify';

import Picture from '../models/picture';

interface PictureQuery {
    page: number;
    count: number;
}

export default {
    async index(req, reply) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const { page, count } = req.query as PictureQuery;

        const pictures = await Picture.find({
            createdAt: { $gte: today },
        }).paginate(page, count);

        return { pictures };
    },
} as {
    index: RouteHandlerMethod;
};
