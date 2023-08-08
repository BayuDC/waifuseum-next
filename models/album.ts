import { prop, pre, plugin, queryMethod, getModelForClass, types } from '@typegoose/typegoose';
import { search, paginate } from './_';

import { Picture } from './picture';
import { User } from './user';
import { Tag } from './tag';

@plugin(require('mongoose-lean-id'))
@queryMethod(paginate)
@queryMethod(search)
@queryMethod(preload)
@queryMethod(hasTag)
@pre('find', function () {
    this.sort({ updatedAt: 'desc' });
})
export class Album {
    @prop()
    public name!: string;

    @prop()
    public alias?: string;

    @prop()
    public slug!: string;

    @prop()
    public private!: boolean;

    @prop()
    public community!: boolean;

    @prop({
        ref: () => Picture,
        localField: '_id',
        foreignField: 'album',
        count: true,
    })
    public picturesCount!: number;

    @prop({
        ref: () => Picture,
        localField: '_id',
        foreignField: 'album',
    })
    public pictures!: types.Ref<Picture>[];

    @prop({ ref: () => Tag })
    public tags!: types.Ref<Tag>[];

    @prop({ ref: () => User })
    public createdBy!: types.Ref<User>;

    @prop()
    public createdAt!: Date;
    @prop()
    public updatedAt!: Date;
}

function preload(this: types.QueryHelperThis<typeof Album, AlbumQuery>) {
    return this.populate({
        path: 'tags',
        select: ['name', 'alias', 'slug'],
    })
        .populate({
            path: 'pictures',
            perDocumentLimit: 5,
            select: ['url', 'urls'],
            options: { sort: { createdAt: 'desc' } },
        })
        .populate({ path: 'picturesCount' });
}
function hasTag(this: types.QueryHelperThis<typeof Album, AlbumQuery>, tagId: any) {
    if (!tagId) return this;
    return this.where({ tags: { $in: [tagId] } });
}

interface AlbumQuery {
    search: types.AsQueryMethod<typeof search<typeof Album, AlbumQuery>>;
    paginate: types.AsQueryMethod<typeof paginate<typeof Album, AlbumQuery>>;
    preload: types.AsQueryMethod<typeof preload>;
    hasTag: types.AsQueryMethod<typeof hasTag>;
}

export default () => getModelForClass<typeof Album, AlbumQuery>(Album);
