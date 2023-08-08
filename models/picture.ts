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
    public urls!: object;

    @prop()
    public source?: string;

    @prop()
    public height!: number;

    @prop()
    public width!: number;

    @prop({ ref: () => Album })
    public album!: types.Ref<Album>;

    @prop({ ref: () => User })
    public createdBy!: types.Ref<User>;

    @prop()
    public createdAt!: Date;
    @prop()
    public updatedAt!: Date;
}

function preload(this: types.QueryHelperThis<typeof Picture, PictureQuery>) {
    return this.populate('album', ['name', 'slug', 'alias']);
}

interface PictureQuery {
    paginate: types.AsQueryMethod<typeof paginate<typeof Picture, PictureQuery>>;
    preload: types.AsQueryMethod<typeof preload>;
}

export default () => getModelForClass<typeof Picture, PictureQuery>(Picture);
