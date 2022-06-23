import { FastifyRequest, RouteHandlerMethod } from 'fastify';

export default {
    async index(req: FastifyRequest) {
        const full = (req.query as { full: any }).full != undefined;

        const albums = await this.mongo.db
            ?.collection('albums')
            .find({ private: false })
            .project({
                id: '$_id',
                ...{ name: 1, slug: 1, private: 1, community: 1 },
                ...(full ? { createdBy: 1, createdAt: 1 } : {}),
            })
            .toArray();

        return { albums };
    },
} as {
    index: RouteHandlerMethod;
};
