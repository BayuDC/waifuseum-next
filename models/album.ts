import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { ObjectId } from '@fastify/mongodb';

interface AlbumModel {
    find(full: Boolean, filter?: Object): Promise<Object[]>;
    findById(id: string): Promise<Object[] | undefined>;
}

declare module 'fastify' {
    interface FastifyInstance {
        model: AlbumModel;
    }
}

export default fp(function (fastify: FastifyInstance, options: Object, done: Function) {
    fastify.decorate('model', {
        async find(full, filter = {}) {
            return await fastify.mongo.db
                ?.collection('albums')
                .aggregate([
                    { $match: { ...filter, private: false } },
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
        async findById(id) {
            return (await this.find(true, { _id: new ObjectId(id) }))[0];
        },
    } as AlbumModel);

    done();
});
