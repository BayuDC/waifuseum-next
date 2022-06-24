import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { ObjectId } from '@fastify/mongodb';

interface AlbumModel {
    findAll(): Promise<Object[]>;
    findById(id: string): Promise<Object>;
}

declare module 'fastify' {
    interface FastifyInstance {
        model: AlbumModel;
    }
}

export default fp(function (fastify: FastifyInstance, options: Object, done: Function) {
    const find = async (filter: Object): Promise<Object[] | undefined> => {
        const pipeline: Object[] = [
            { $match: { ...filter, private: false } },
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
            {
                $project: {
                    id: '$_id',
                    _id: 0,
                    name: 1,
                    slug: 1,
                    private: 1,
                    community: 1,
                    createdAt: 1,
                    createdBy: 1,
                    picturesCount: '$pictures.count',
                },
            },
        ];

        return await fastify.mongo.db?.collection('albums').aggregate(pipeline).toArray();
    };

    fastify.decorate('model', {
        async findAll() {
            return await find({});
        },
        async findById(id) {
            if (!ObjectId.isValid(id)) return;

            return ((await find({
                _id: new ObjectId(id),
            })) || [])[0];
        },
    } as AlbumModel);

    done();
});
