import mongoose, { Schema } from 'mongoose';
import { AlbumDocument, AlbumModel } from './types/album';

import Picture from './picture';
import User from './user';
import Tag from './tag';

const schema: Schema = new mongoose.Schema<AlbumDocument>(
    {
        name: { type: String },
        alias: { type: String },
        description: { type: String },
        slug: { type: String },
        private: { type: Boolean },
        community: { type: Boolean },
        tags: [{ type: mongoose.mongo.ObjectId, ref: Tag }],
        createdBy: {
            type: mongoose.mongo.ObjectId,
            ref: User,
        },
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
    }
);

schema.plugin(require('mongoose-lean-id'));

schema.virtual('picturesCount', {
    ref: Picture,
    localField: '_id',
    foreignField: 'album',
    count: true,
});
schema.virtual('pictures', {
    ref: Picture,
    localField: '_id',
    foreignField: 'album',
});

schema.pre(/^find/, function (next) {
    const { simple, search } = this.getOptions();

    if (search) {
        this.where({ slug: { $regex: '.*' + search + '.*' } });
    }

    if (simple) {
        this.select({ name: 1, alias: 1, slug: 1 });
    } else {
        // @ts-ignore
        this.populate('picturesCount');
        // @ts-ignore
        this.populate({
            path: 'pictures',
            perDocumentLimit: 5,
            select: ['url', 'urls'],
            sort: { createdAt: 'desc' },
        });
        // @ts-ignore
        this.populate({
            path: 'tags',
            select: ['name', 'slug', 'alias'],
        });
    }

    next();
});

schema.static('paginate', async function (page, count, options) {
    return await this.find()
        .sort({ updatedAt: 'desc' })
        .setOptions(options)
        .skip(count * (page - 1))
        .limit(count)
        .lean();
});

export default mongoose.model<AlbumDocument, AlbumModel>('Album', schema);
