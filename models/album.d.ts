import { Document, Model } from 'mongoose';
export interface AlbumDocument extends Document {
    id: string;
    name: string;
    slug: string;
    private: boolean;
    community: boolean;
    picturesCount: number;
    createdBy: {
        id: string;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface AlbumModel extends Model<AlbumDocument> {
    paginate(number, number): Promise<[AlbumDocument]>;
}
