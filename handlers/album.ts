import { FastifyRequest, RouteHandlerMethod } from 'fastify';

export default {
    async index(req: FastifyRequest) {
        const full = (req.query as { full: any }).full != undefined;

        const albums = await this.mongo.db
            ?.collection('albums')
            .aggregate([
                { $match: { private: false } },
                ...(full
                    ? [
                          {
                              $lookup: {
                                  from: 'users',
                                  localField: 'createdBy',
                                  foreignField: '_id',
                                  as: 'createdBy',
                                  pipeline: [{ $project: { _id: 0, id: '$_id', name: 1 } }],
                              },
                          },
                          { $unwind: '$createdBy' },
                          {
                              $lookup: {
                                  from: 'pictures',
                                  localField: '_id',
                                  foreignField: 'album',
                                  as: 'pictures',
                                  pipeline: [{ $count: 'count' }],
                              },
                          },
                          { $unwind: '$pictures' },
                      ]
                    : []),
                {
                    $project: {
                        ...{ _id: 0, id: '$_id', name: 1, slug: 1, private: 1, community: 1 },
                        ...(full ? { createdAt: 1, createdBy: 1, picturesCount: '$pictures.count' } : {}),
                    },
                },
            ])
            .toArray();

        return { albums };
    },
} as {
    index: RouteHandlerMethod;
};
