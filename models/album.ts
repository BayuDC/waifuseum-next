import { prop, pre, plugin, queryMethod, getModelForClass, types } from '@typegoose/typegoose';

import { Picture } from './picture';
import { User } from './user';
import { Tag } from './tag';

@plugin(require('mongoose-lean-id'))
@queryMethod(paginate)
@queryMethod(search)
@queryMethod(preload)
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

function paginate(this: types.QueryHelperThis<typeof Album, AlbumQuery>, page: number, count: number) {
    return this.skip(count * (page - 1)).limit(count);
}
function search(this: types.QueryHelperThis<typeof Album, AlbumQuery>, keyword?: string) {
    if (keyword) return this.where({ slug: { $regex: '.*' + keyword + '.*' } });
    return this;
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

interface AlbumQuery {
    paginate: types.AsQueryMethod<typeof paginate>;
    search: types.AsQueryMethod<typeof search>;
    preload: types.AsQueryMethod<typeof preload>;
}

export default () => getModelForClass<typeof Album, AlbumQuery>(Album);
