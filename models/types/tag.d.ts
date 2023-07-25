import { Document, Model } from 'mongoose';

import { UserDocument } from './user';

export interface TagDocument extends Document {
    id: string;
    name: string;
    alias: string;
    description: string;
    slug: string;
    createdBy: UserDocument;
    createdAt: Date;
    updatedAt: Date;
}

export interface TagModel extends Model<TagDocument> {}
