import { Document, Model, Query } from 'mongoose';

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

export interface PictureQueryHelper {
    paginate(this: PictureModelQuery, page: number, count: number): PictureModelQuery;
}

export interface PictureModelQuery extends Query<any, PictureDocument, PictureQueryHelper> {}

export interface PictureModel extends Model<PictureDocument, PictureQueryHelper> {}
