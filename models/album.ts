import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { ObjectId } from '@fastify/mongodb';

interface AlbumModel {
    findAll(options: { simple: boolean; page?: number; count?: number }): Promise<Object[]>;
    findPics(id: string, options?: { page?: number; count?: number }): Promise<Object[]>;
    findById(id: string): Promise<Object>;
}

declare module 'fastify' {
    interface FastifyInstance {
        model: AlbumModel;
    }
}

export default fp(function (fastify: FastifyInstance, options: Object, done: Function) {
    const find = async (
        filter?: Object,
        options?: { simple: boolean; page?: number; count?: number }
    ): Promise<Object[] | undefined> => {
        const population: Object[] = options?.simple
            ? []
            : [
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
              ];
        const pagination: Object[] =
            options?.count && options?.page
                ? [{ $skip: options?.count * (options?.page - 1) }, { $limit: options?.count }]
                : [];
        const projection: Object = options?.simple
            ? {}
            : {
                  private: 1,
                  community: 1,
                  createdAt: 1,
                  createdBy: 1,
                  picturesCount: '$pictures.count',
              };
        const pipeline: Object[] = [
            { $match: { ...filter, private: false } },
            ...population,
            ...pagination,
            { $project: { id: '$_id', _id: 0, name: 1, slug: 1, ...projection } },
        ];

        return await fastify.mongo.db?.collection('albums').aggregate(pipeline).toArray();
    };
    const findPics = async (
        filter?: Object,
        options?: { page?: number; count?: number }
    ): Promise<Object[] | undefined> => {
        const pagination: Object[] =
            options?.count && options?.page
                ? [{ $skip: options?.count * (options?.page - 1) }, { $limit: options?.count }]
                : [];

        return await fastify.mongo.db
            ?.collection('pictures')
            .aggregate([{ $match: filter }, ...pagination, { $project: { id: '$_id', _id: 0, url: 1, source: 1 } }])
            .toArray();
    };

    fastify.decorate('model', {
        async findAll(options) {
            return await find({}, options);
        },
        async findById(id) {
            if (!ObjectId.isValid(id)) return;

            return ((await find({
                _id: new ObjectId(id),
            })) || [])[0];
        },
        async findPics(id, options = {}) {
            if (!ObjectId.isValid(id)) return [];

            const pictures = await findPics({ album: new ObjectId(id) }, options);

            return pictures;
        },
    } as AlbumModel);

    done();
});
