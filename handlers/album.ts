import { RouteHandlerMethod } from 'fastify';

export default {
    async index(req, reply) {
        const albums = await this.mongo.db
            ?.collection('albums')
            .find({ private: false })
            .project({
                id: '$_id',
                ...{ name: 1, slug: 1, private: 1, community: 1 },
            })
            .toArray();

        return { albums };
    },
} as {
    index: RouteHandlerMethod;
};
