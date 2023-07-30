import { RouteHandlerMethod } from 'fastify';

import Picture from '../models/picture';

export default {
    async index(req, reply) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const pictures = await Picture.find({
            createdAt: { $gte: today },
        }).paginate(1, 10);

        return { pictures };
    },
} as {
    index: RouteHandlerMethod;
};
