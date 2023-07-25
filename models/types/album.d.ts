import { Document, Model } from 'mongoose';

import { UserDocument } from './album';

export interface AlbumDocument extends Document {
    id: string;
    name: string;
    alias: string;
    description: string;
    slug: string;
    private: boolean;
    community: boolean;
    picturesCount: number;
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
        }
    ): Promise<AlbumDocument[]>;
}
