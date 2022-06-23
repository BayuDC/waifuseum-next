import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

interface AlbumModel {
    find(full: Boolean): Promise<Object[] | undefined>;
}

declare module 'fastify' {
    interface FastifyInstance {
        model: {
            album: AlbumModel;
        };
    }
}

export default fp(function (fastify: FastifyInstance, options: Object, done: Function) {
    fastify.decorate('model', {
        album: {
            async find(full) {
                return await fastify.mongo.db
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
            },
        } as AlbumModel,
    });

    done();
});
