import mongoose, { Schema } from 'mongoose';
import Picture from './picture';
import User from './user';

const schema: Schema = new mongoose.Schema(
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
    this.select({ channelId: 0 });
    this.populate('picturesCount');
    this.populate('createdBy', 'name');

    next();
});

export default mongoose.model('Album', schema);
