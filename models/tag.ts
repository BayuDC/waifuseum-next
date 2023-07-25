import mongoose, { Schema } from 'mongoose';
import { TagDocument, TagModel } from './types/tag';

import User from './user';

const schema: Schema<TagDocument> = new mongoose.Schema(
    {
        name: { type: String },
        alias: { type: String },
        description: { type: String },
        slug: { type: String },
        createdBy: {
            type: mongoose.mongo.ObjectId,
            ref: User,
        },
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    { versionKey: false }
);

export default mongoose.model<TagDocument, TagModel>('Tag', schema);
