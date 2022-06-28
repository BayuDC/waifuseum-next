import mongoose, { Schema } from 'mongoose';
import { AlbumDocument, AlbumModel } from './album.d';

import Picture from './picture';
import User from './user';

const schema: Schema = new mongoose.Schema<AlbumDocument>(
    {
        name: { type: String },
        slug: { type: String },
        private: { type: Boolean },
        community: { type: Boolean },
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

schema.pre(/^find/, function (next) {
    const { simple } = this.getOptions();

    if (simple) {
        this.select({ name: 1, slug: 1 });
    } else {
        this.select({ channelId: 0 });
        this.populate('picturesCount');
        this.populate('createdBy', 'name');
    }

    next();
});

schema.static('paginate', async function (page, count, options) {
    return await this.find()
        .setOptions(options)
        .skip(count * (page - 1))
        .limit(count)
        .lean();
});

export default mongoose.model<AlbumDocument, AlbumModel>('Album', schema);
