import { Document, Model } from 'mongoose';

import { AlbumDocument } from './album';
import { UserDocument } from './album';

export interface PictureDocument extends Document {
    id: string;
    url: string;
    source: string;
    width: number;
    height: number;
    album: AlbumDocument;
    createdBy: UserDocument;
    createdAt: Date;
    updatedAt: Date;
}

export interface PictureModel extends Model<AlbumDocument> {}
