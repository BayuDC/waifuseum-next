import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { ObjectId } from '@fastify/mongodb';

interface AlbumModel {
    findAll(full: boolean): Promise<Object[]>;
    findById(id: string | ObjectId, full: boolean, populate: boolean): Promise<Object | undefined>;
}

declare module 'fastify' {
    interface FastifyInstance {
        model: AlbumModel;
    }
}

export default fp(function (fastify: FastifyInstance, options: Object, done: Function) {
    const find = async (filter: Object, options: { full?: boolean; populate?: boolean }): Promise<Object[]> => {
        return (
            (await fastify.mongo.db
                ?.collection('albums')
                .aggregate([
                    { $match: { ...filter, private: false } },
                    ...(options.full
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
                                      pipeline: options.populate
                                          ? [{ $project: { _id: 0, id: '$_id', url: 1, source: 1, createdAt: 1 } }]
                                          : [{ $count: 'count' }],
                                  },
                              },
                              ...(options.populate ? [] : [{ $unwind: '$pictures' }]),
                          ]
                        : []),
                    {
                        $project: {
                            ...{ _id: 0, id: '$_id', name: 1, slug: 1, private: 1, community: 1 },
                            ...(options.full
                                ? {
                                      createdAt: 1,
                                      createdBy: 1,
                                      ...(options.populate
                                          ? { pictures: 1, picturesCount: { $size: '$pictures' } }
                                          : { picturesCount: '$pictures.count' }),
                                  }
                                : {}),
                        },
                    },
                ])
                .toArray()) || []
        );
    };

    fastify.decorate('model', {
        async findAll(full) {
            return await find({}, { full });
        },
        async findById(id, full, populate) {
            if (!ObjectId.isValid(id)) {
                return undefined;
            }
            id = new ObjectId(id);

            return (await find({ _id: id }, { full, populate }))[0];
        },
    } as AlbumModel);

    done();
});
