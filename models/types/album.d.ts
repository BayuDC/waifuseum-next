import { Document, Model } from 'mongoose';

import { UserDocument } from './user';
import { TagDocument } from './tag';

export interface AlbumDocument extends Document {
    id: string;
    name: string;
    alias: string;
    description: string;
    slug: string;
    private: boolean;
    community: boolean;
    picturesCount: number;
    tags: TagDocument[];
    createdBy: UserDocument;
    createdAt: Date;
    updatedAt: Date;
}

export interface AlbumModel extends Model<AlbumDocument> {
    paginate(
        page: number,
        count: number,
        options: {
            simple: boolean;
            search: string;
        }
    ): Promise<AlbumDocument[]>;
}
