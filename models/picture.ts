import mongoose, { Schema } from 'mongoose';

const schema: Schema = new mongoose.Schema(
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
    }
);

export default mongoose.model('Picture', schema);
