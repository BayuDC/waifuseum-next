import { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
    id: string;
    name: string;
    email: string;
}

export interface UserModel extends Model<AlbumDocument> {}
