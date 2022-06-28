import mongoose, { Schema, Query } from 'mongoose';
import { PictureDocument, PictureModel } from './types/picture';

const schema: Schema = new mongoose.Schema<PictureDocument>(
    {
        url: { type: String },
        source: { type: String },
        width: { type: Number },
        height: { type: Number },
        album: {
            type: mongoose.mongo.ObjectId,
            ref: 'Album',
        },
        createdBy: {
            type: mongoose.mongo.ObjectId,
            ref: 'User',
        },
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        query: {
            paginate(page: number, count: number) {
                return this.skip(count * (page - 1)).limit(count);
            },
        },
    }
);
schema.plugin(require('mongoose-lean-id'));

schema.pre(/^find/, function (this: Query<any, PictureDocument>, next) {
    this.select({
        url: { $concat: ['https://media.discordapp.net/attachments', '$url'] },
        source: 1,
    }).lean();

    next();
});

export default mongoose.model<PictureDocument, PictureModel>('Picture', schema);
