import { prop, pre, plugin, getModelForClass, types, queryMethod } from '@typegoose/typegoose';
import { paginate } from './_';

import { User } from './user';
import { Album } from './album';

@plugin(require('mongoose-lean-id'))
@plugin(require('mongoose-lean-getters'))
@pre('find', function () {
    this.sort({ createdAt: 'desc' });
})
@queryMethod(paginate)
@queryMethod(preload)
@queryMethod(hasAlbum)
export class Picture {
    @prop()
    public url!: string;

    @prop({
        get(v) {
            return {
                base: v.base,
                original: v.base,
                thumbnail: v.base + v.thumbnail,
                minimal: v.base + v.minimal,
                standard: v.base + v.standard,
            };
        },
    })
    public urls!: {
        base: string;
        original: string;
        thumbnail: string;
        minimal: string;
        standard: string;
    };

    @prop()
    public source?: string;

    @prop({ select: 0 })
    public height!: number;

    @prop({ select: 0 })
    public width!: number;

    @prop({ select: 0 })
    public messageId!: string;

    @prop({ ref: () => Album, select: 0 })
    public album!: types.Ref<Album>;

    @prop({ ref: () => User, select: 0 })
    public createdBy!: types.Ref<User>;

    @prop()
    public createdAt!: Date;
    @prop()
    public updatedAt!: Date;
}

function preload(this: types.QueryHelperThis<typeof Picture, PictureQuery>) {
    return this.populate('album', ['name', 'slug', 'alias']);
}
function hasAlbum(this: types.QueryHelperThis<typeof Picture, PictureQuery>, albumId: any) {
    return this.where({ album: albumId });
}

interface PictureQuery {
    paginate: types.AsQueryMethod<typeof paginate<typeof Picture, PictureQuery>>;
    preload: types.AsQueryMethod<typeof preload>;
    hasAlbum: types.AsQueryMethod<typeof hasAlbum>;
}

export default () => getModelForClass<typeof Picture, PictureQuery>(Picture);
