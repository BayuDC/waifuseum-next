import mongoose, { Schema, Query } from 'mongoose';
import { PictureDocument, PictureModel, PictureUrlDocument } from './types/picture';

const schema: Schema = new mongoose.Schema<PictureDocument>(
    {
        url: { type: String },
        urls: {
            type: {
                base: { type: String },
                thumbnail: { type: String },
                minimal: { type: String },
                standard: { type: String },
            },
            get(v: PictureUrlDocument) {
                return {
                    base: v.base,
                    original: v.base,
                    thumbnail: v.base + v.thumbnail,
                    minimal: v.base + v.minimal,
                    standard: v.base + v.standard,
                };
            },
        },
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
        query: {
            paginate(page: number, count: number) {
                return this.skip(count * (page - 1)).limit(count);
            },
        },
    }
);
schema.plugin(require('mongoose-lean-id'));
schema.plugin(require('mongoose-lean-getters'));

schema.pre(/^find/, function (this: Query<any, PictureDocument>, next) {
    this.select({
        url: 1,
        urls: 1,
        source: 1,
        createdAt: 1,
        updatedAt: 1,
    })
        .sort({ createdAt: 'desc' })
        .lean({ getters: true });

    next();
});

export default mongoose.model<PictureDocument, PictureModel>('Picture', schema);
