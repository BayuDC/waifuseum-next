import mongoose, { Schema } from 'mongoose';
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
    }
);
schema.plugin(require('mongoose-lean-id'));

export default mongoose.model<PictureDocument, PictureModel>('Picture', schema);
